<template>
  <img :src="imageUrl" :onerror="onError" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();

const imageUrl = ref<string>(`/emoji/${props.name}.png`);

function onError() {
  // 圖片網址請求失敗時的備案
  imageUrl.value = '/emoji/122.png';
}
</script>

<style scoped>
img {
  width: 20px;
  display: inline-block;
  vertical-align: middle;
}
</style>
