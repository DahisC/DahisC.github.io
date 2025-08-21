---
outline: deep
---

<script setup>
import * as Yup from 'yup';
import CustomInput from './CustomInput.vue';
import FormField from './FormField.vue';
import { useForm } from 'vee-validate';

const schema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/,
      '密碼必須使用 6-15 個字元內，混合數字、英文大小寫字母'
    ),
});

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
  },
});
</script>

[](https://stackblitz.com/edit/nuxt-starter-senm39kr?embed=1&file=README.md)

# Vue 自訂表單元件與驗證

## 前言
最近在寫專案的時候遇到需要自己刻元件再搭配表單驗證的情況，想透過這篇文章記錄一下問題與解法

不確定自己的寫法是不是最好的，但目前的寫法是我覺得彈性最高的方式，也方便未來根據這套基礎擴充表單元件

<!-- 由於 Vue 3 中常常會需要自己刻一個輸入框之類的元件，最近在寫 Side-Project 的時候剛好遇到元件需要搭配表單驗證的需求，但這個需求是刻完元件之後才發生的，雖然最簡單的方式是直接把整個表單驗證的邏輯寫在元件中，但我認為元件應該要維持最低限度的程式碼，也就是除了樣式之外，外部應該只需要使用 `v-model` 就可以簡單地使用，而且也有可能會有需要用這個輸入框但不需要表單驗證的情況，所以把 vee-validate 的函式引入元件感覺不是一個很好的實作方式 -->

## Vee-Validate

### 為什麼選擇 Vee-Validate
Vee-Validate 現在可以支援 Composition API 的寫法，而我自己也已經從 Options API 轉移到 Composition API，所以剛好可以滿足我的需求

### 使用組合式 API

### 表單層級驗證還是欄位層級驗證


## 實作

### 建立一個自訂元件
這個自訂元件只會透過 Vue 3.4 的 `defineModel` 進行雙向綁定，並且著重在元件的樣式上，不包含表單驗證邏輯

<CustomInput />
<CustomInput :error="true" />


```vue
<template>
  <input v-model="value" :class="inputClass" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  error?: boolean; // 開啟一個 prop error 以自訂錯誤時的樣式
}

const props = defineProps<Props>();

const value = defineModel(); // 透過 defineModel 簡易地雙向綁定

const inputClass = computed(() => ({
  'text-white bg-zinc-800 border border-transparent border-solid rounded-5px px-15px h-40px': true,
  'border-red': props.error,
}));
</script>
```

### 加入表單驗證邏輯之 1
在建立完一個自訂表單元件之後，一直在思考究竟要不要把 Vee-Validate 的表單驗證邏輯相關程式碼寫在元件之中，畢竟在官方的[範例](https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/)中也是這樣子實作的，只需要在原本的元件中使用 `useField` 並且接受一個 `name` 作為 props 傳入即可

如果按照官方的範例，程式碼應該會變成這樣：

```vue
<template>
  <input v-model="value" :class="inputClass" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useField } from 'vee-validate';

interface Props {
  name?: string; // [!code highlight]
  error?: boolean; // 開啟一個 prop error 以自訂錯誤時的樣式
}

const props = defineProps<Props>();

// const value = defineModel(); // 這邊會使用下方 useField 的 value 讓元件跟 vee-validate 的驗證邏輯綁定

const inputClass = computed(() => ({
  'text-white bg-zinc-800 border border-transparent border-solid rounded-5px px-15px h-40px': true,
  'border-red': props.error,
}));

const { value } = useField(() => props.name); // 使用 useField 綁定表單欄位 [!code highlight]
</script>
```

如果元件是自己寫的，的確這種做法會簡單很多

但考量到如果未來要整合外部套件的元件，把程式碼加到這些外部套件的元件中可能不是一種很好的做法

### 加入表單驗證邏輯之 2
在 1 中，由於不想把表單驗證的邏輯寫到元件裡，所以我決定使用更為彈性的寫法

先釐清一下一個表單元件，應該具備哪些必要元素：
1. `<label>` 標籤，並且也會使用 `for` 與這個表單元件的 `id` 綁定
2. 驗證失敗的錯誤訊息
3. 當然也要可以透過 v-model 雙向綁定

綜合以上幾個需求，又希望可以彈性擴充的話，我決定建立一個 `<FormField>` 包住自訂的表單元件 `<CustomInput>` 或是外部套件的元件

<FormField label="Label" name="password">
  <template #default="{ model, id }">
      <CustomInput v-model="model.value" :id />
  </template>
</FormField>

```vue
<template>
  <div class="inline-flex flex-col gap-y-10px">
    <div class="flex gap-x-8px items-center">
      <slot name="label" :id="name">
        <label v-if="label" :for="name" class="text-h6 flex items-center gap-x-5px">
          {{ label }}
          <span v-if="required" class="text-orange-dark">*</span>
        </label>
      </slot>

      <slot name="label-append" />
    </div>

    <slot :id="name" :model="field.value" /> <!-- 這邊則透過 slot props 將 field.value 傳遞至上層以供雙向綁定 [!code highlight] -->

    <p v-if="!hideErrorMessage && hasErrorMessage" class="text-12px text-orange !m-0">{{ field.errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useField } from 'vee-validate';

interface Props {
  label?: string;
  name: string;
  required?: boolean;
  error?: boolean;
  hideErrorMessage?: boolean;
}

const { name, label, required = false, hideErrorMessage = false } = defineProps<Props>();

//

const field = useField(() => name); // 這邊同樣使用 useField 但不解構以保持 value 的響應性 [!code highlight]
const hasErrorMessage = computed(() => !!field.errorMessage.value);
</script>

```

```vue
<script setup>
import * as Yup from 'yup';
import CustomInput from './CustomInput.vue';
import FormField from './FormField.vue';
import { useForm } from 'vee-validate';

const schema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,15}$/,
      '密碼必須使用 6-15 個字元內，混合數字、英文大小寫字母'
    ),
});

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
  },
});
</script>
```

在完成上述的元件與 `<script>` 區塊的內容後，可以在 `<template>` 中這樣使用

```vue
<FormField label="Label" name="password">
  <template #default="{ model, id }">
      <CustomInput v-model="model.value" :id />
  </template>
</FormField>
```

`id` 來自於從 `<FormField>` 元件的傳入的 `name`，再透過 Slot props 傳出後綁定至 `id` 上，這樣就能讓 `<label>` 跟自訂的表單元件作動

同時也在表單元件上透過 `v-model` 雙向綁定 Slot props 的 `model`，但由於要保持響應性所以傳出的會是 `Ref`，需要再使用 `.value` 才能正確綁定

到此就已經完成整個自訂表單元件跟 VeeValidate 套件的綁定過程，同時也將表單元件的驗證邏輯與顯示邏輯切開，以保持未來擴充的彈性