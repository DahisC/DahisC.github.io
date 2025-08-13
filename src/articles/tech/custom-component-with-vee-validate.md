---
outline: deep
---

# 如何在 Vue 中使用自訂組件與 vee-validate 套件綁定並進行驗證

## 起因

由於 Vue 3 中常常會需要自己刻一個輸入框之類的組件，最近在寫 Side-Project 的時候剛好遇到組件需要搭配表單驗證的需求，但這個需求是刻完組件之後才發生的，雖然最簡單的方式是直接把整個表單驗證的邏輯寫在組件中，但我認為組件應該要維持最低限度的程式碼，也就是除了樣式之外，外部應該只需要使用 `v-model` 就可以簡單地使用，而且也有可能會有需要用這個輸入框但不需要表單驗證的情況，所以把 vee-validate 的函式引入組件感覺不是一個很好的實作方式

## 實作

### 先刻一個可供雙向綁定的輸入框

```vue
<template>
  <input v-model="value" :class="inputClass" />
</template>

<script setup lang="ts">
interface Props {
  error?: boolean; // 開啟一個 prop error 以自訂錯誤時的樣式
}

const props = defineProps<Props>();

const value = defineModel(); // 透過 defineModel 簡易地雙向綁定

const inputClass = computed(() => ({
  'bg-white border border-divider-color rounded-5px px-15px placeholder-gray-2 text-h6 h-50px w-full': true,
  'border-orange !bg-orange-bg': props.error,
}));
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
```