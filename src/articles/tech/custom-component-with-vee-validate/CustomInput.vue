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
