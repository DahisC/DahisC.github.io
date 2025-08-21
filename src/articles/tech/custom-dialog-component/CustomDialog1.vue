<template>
  <dialog ref="dialog">
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modal?: boolean; // 決定要以 modal 還是 non-modal 的形式開啟
}

const model = defineModel<boolean>(); // 透過 defineModel 簡易地雙向綁定
const props = defineProps<Props>();
//

const dialog = ref<HTMLDialogElement>(); // 透過 ref 取得 dialog 原生的方法

function show() {
  // 根據 props.modal 決定呼叫的方法
  if (props.modal) dialog.value?.showModal();
  else dialog.value?.show();

  model.value = true; // 開啟後同步變更狀態
}

function close() {
  dialog.value?.close();
  model.value = false;
}

// 監控 modelValue 的變化呼叫開啟或關閉方法
watch(model, (isOpen) => {
  if (isOpen) show();
  else close();
});
</script>

<style scoped>
dialog::backdrop {
  background-color: rgba(#222222, 0.75);
}
</style>
