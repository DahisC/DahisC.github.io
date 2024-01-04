---
title: Vue 的各種雙向綁定
tags:
  - Vue
abbrlink: 8863
date: 2024-01-04 23:03:40
---

# 前言

在 Vue 中，透過 `v-model` 可以簡單地雙向綁定原生標籤的輸入（事件）與輸出（顯示），如下：

```vue
// App.vue
<template>
    <input v-model="input" />
</template>

<script setup lang="ts">
    const input = ref('')
</script>
```

- - -

但如果我們試圖建立一個自訂的 Input 組件（假設這個 Input 可能會有額外的樣式），這個雙向綁定就會失效：

```vue
// App.vue
<template>
    <CustomInput v-model="input" />
</template>

<script setup lang="ts">
    const input = ref('')
</script>

// CustomInput.vue
<template>
    <input />
</template>
```

# 要怎麼重新雙向綁定？

接下來的範例，App.vue 中的內容都不會改變，我們將注意力放在 **CustomInput.vue**。

```vue
// App.vue
<template>
    <CustomInput v-model="input" />
</template>

<script setup lang="ts">
    const input = ref('')
</script>
```

## 方法一 - 重新雙向綁定

將來自父層的 prop `modelValue` 傳給 input 顯示，並且捕捉 `input` 的輸入事件，透過 `emit` 事件將值更新回上一層組件。

```vue
// CustomInput.vue
<template>
    <input :value="modelValue" @input="onInput" />
</template>

<script setup lang="ts">
interface Props {
    modelValue: string;
}

interface Emits {
    (e: 'update:model-value', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onInput = (e: any) => { // 這邊的 e 請允許我先用 any
    emit('update:model-value', e.target.value);
}
</script>
```

## 方法二 - 透過 getter/setter

這個方式跟方法一有點像，但是稍微縮短了一些程式碼。

利用 getter/setter 的特性，當 `input` 變數被取用的時候我們透過 `return props.modelValue` 取得來自 prop 的 `modelValue`，並且在 `input` 被賦值的時候，經過 setter `emit('update:model-value', value)` 發送回上層更新值。

同樣也是重新做了雙向綁定，但讓程式碼的邏輯更為集中（集中在 `input` 這個變數處理）。

```vue
// CustomInput.vue
<template>
    <input v-model="input" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    modelValue: string;
}

interface Emits {
    (e: 'update:model-value', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const input = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        emit('update:model-value', value);
    },
});
</script>
```

## 方法三 - VueUse 的 useVModel

透過別人寫好的函式，我們可以省略自己寫 getter/setter。

```vue
// CustomInput.vue
<template>
    <input v-model="input" />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

interface Props {
    modelValue: string;
}

interface Emits {
    (e: 'update:model-value', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const input = useVModel(props, 'modelValue', emit);
</script>
```

透過（簡略地查看）[原始碼](https://github.com/vueuse/vueuse/blob/main/packages/core/useVModel/index.ts)也可以看到 VueUse 最終回傳了一個跟方法二一樣的寫法：

```js
return computed<P[K]>({
    get() {
        return getValue()!
    },
    set(value) {
        triggerEmit(value)
    },
})
```

其實到這邊已經算是很方便了，我們工程師只需要安裝一個函式庫再引入 useVModel 再定義 `props` 跟 `emit` 就可以重新建立雙向綁定。

人要知足。

## 方法四 - Vue 原生的 defineModel

欸？？？？？

> 這個方法在 Vue 3.4 版中已經被更新為 Stable 了，請大家放心使用。

```vue
// CustomInput.vue
<template>
    <input v-model="input" />
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

const input = defineModel();
</script>
```

# 結語

***尤雨溪，我謝謝你***。