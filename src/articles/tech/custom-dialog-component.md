# 實作自訂 Dialog

## 前言
在前端專案中常常會有需要製作彈出視窗的需求，以往在製作這類型的元件時，最常見的做法是透過 `position: fixed` 將一個 `<div>` 元素釘選到畫面上，再透過 `z-index` 將顯示層級提高以遮擋其它元素，但這種方式比較麻煩的點是需要自己管理 `z-index` 的順序，而最近也有原生的 `<dialog` 標籤可以協助我們做到這件事情了

::: info
`<dialog>` 標籤在 2022 年 3 月開始已經廣泛地被各個瀏覽器支援
:::


## 屬性與方法

### 屬性
`open` (boolean) - 控制 `<dialog>` 是否向使用者顯示，但文件建議透過方法 `show()` 或是 `showModal()` 控制而非直接透過此屬性，透過此屬性開啟的 `<dialog>` 會是 non-modal 的形式

### 方法
`show` (method) - 以 non-modal 的形式開啟

`showModal` (method) - 以 modal 的形式開啟


## 常見問題

### modal 與 non-modal
在 `<dialog>` 元素開啟時，根據呼叫的方法會區分成以下兩種模式：

1. 透過 `show()` 開啟時為 non-modal
2. 透過 `showModal()` 開啟時為 modal

- non-modal
  - 允許使用者繼續跟頁面的其它元素互動
  - 無 `::backdrop` 偽元素作為背景
  - 無法透過 `Esc` 鍵關閉
- modal
  - 不允許使用者繼續跟頁面的其它元素互動
  - 有 `::backdrop` 偽元素作為背景
  - 可以透過 `Esc` 鍵關閉


## 最佳實作

### 在 ::backdrop 偽元素上加上背景樣式需求
但要注意的是 ::backdrop 偽元素只有在透過 `showModal()` 才會出現 

### 添加 autofocus 屬性到希望使用者第一時間互動的元素上
在 `<dialog>` 被打開後元素上的 `autofocus` 標籤可以協助定位使用者的關注點，例如下一步等等的按鈕，如果沒有此類按鈕則建議加在關閉按鈕上 


## 在 Vue 中實作元件

### 基礎元件

這個步驟專注在以下幾個點：

1. 寫成 Vue 的元件，並可以透過 `v-model` 雙向綁定
2. 在 props 中新增布林值 `modal` 屬性讓使用者選擇以 modal 或是 non-modal 的方式開啟視窗
3. 修改 `::backdrop` 背景顏色


```vue
<template>
  <dialog ref="dialog"> 
      <slot />
  </dialog>
</template>


<script setup lang="ts">
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
watch(
  model,
  (isOpen) => {
    if (isOpen) show();
    else close();
  }
);
</script>

<style scoped>
  dialog::backdrop {
    background-color: red;
  }
</style>
```

## 加入