---
outline: deep
---

<script setup>
import CustomInput from './CustomInput.vue'
</script>

# Vue 自訂表單元件與驗證

## 前言
最近在寫專案的時候遇到需要自己刻組件再搭配表單驗證的情況，想透過這篇文章記錄一下問題與解法

不確定自己的寫法是不是最好的，但目前的寫法是我覺得彈性最高的方式，也方便未來根據這套基礎擴充表單元件

<!-- 由於 Vue 3 中常常會需要自己刻一個輸入框之類的組件，最近在寫 Side-Project 的時候剛好遇到組件需要搭配表單驗證的需求，但這個需求是刻完組件之後才發生的，雖然最簡單的方式是直接把整個表單驗證的邏輯寫在組件中，但我認為組件應該要維持最低限度的程式碼，也就是除了樣式之外，外部應該只需要使用 `v-model` 就可以簡單地使用，而且也有可能會有需要用這個輸入框但不需要表單驗證的情況，所以把 vee-validate 的函式引入組件感覺不是一個很好的實作方式 -->

## Vee-Validate

### 為什麼選擇 Vee-Validate
Vee-Validate 現在可以支援 Composition API 的寫法，而我自己也已經從 Options API 轉移到 Composition API，所以剛好可以滿足我的需求

### 使用組合式 API

### 表單層級驗證還是欄位層級驗證


## 實作

### 建立一個自訂元件
這個自訂元件只會透過 Vue 3.4 的 `defineModel` 進行雙向綁定，並且著重在元件的樣式上，不包含表單驗證邏輯


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

普通樣式
<CustomInput />

錯誤樣式
<CustomInput :error="true" />


### 加入表單驗證邏輯之 1
在建立完一個自訂表單元件之後，一直在思考究竟要不要把 Vee-Validate 的表單驗證邏輯相關程式碼寫在組件之中，畢竟在官方的[範例](https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs/)中也是這樣子實作的，只需要在原本的組件中使用 `useField` 並且接受一個 `name` 作為 props 傳入即可

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

const value = defineModel(); // 透過 defineModel 簡易地雙向綁定

const inputClass = computed(() => ({
  'text-white bg-zinc-800 border border-transparent border-solid rounded-5px px-15px h-40px': true,
  'border-red': props.error,
}));

useField(() => props.name); // 使用 useField 綁定表單欄位 [!code highlight]
</script>
```

如果元件是自己寫的，的確這種做法會簡單很多

但考量到如果未來要整合外部套件的元件，把程式碼加到這些外部套件的元件中可能不是一種很好的做法

### 加入表單驗證邏輯之 2
在上個步驟中，由於不想把表單驗證的邏輯寫到元件之中，所以我決定使用更為彈性的寫法

我的想法是如果是一個表單元件，通常會需要搭配 `<label>`，並且點擊這個 `<label>` 應該要可以 focus 我們的表單元件，同時這個表單元件也支援顯示透過 Vee-Validate 驗證失敗的錯誤訊息