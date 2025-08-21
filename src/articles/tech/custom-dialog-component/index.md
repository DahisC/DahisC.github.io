---
outline: deep
---

<script setup>
import { ref } from 'vue';
import CustomDialog1 from './CustomDialog1.vue';
import CustomDialog2 from './CustomDialog2.vue';
import CustomDialog3 from './CustomDialog3.vue';
import CustomDialog4 from './CustomDialog4.vue';
import Button from '../../../components/Button.vue';

const withoutModalProperty = ref(false);
const withModalProperty = ref(false);
const contentCentered = ref(false);
const clickOutsideToClose = ref(false);
const hideOverflowWhenModalExists = ref(false);
</script>

# 實作自訂 Dialog

## 前言
在前端專案中常常會有需要製作彈出視窗的需求，以往在製作這類型的元件時，最常見的做法是透過 `position: fixed` 將一個 `<div>` 元素釘選到畫面上，再透過 `z-index` 將顯示層級提高以遮擋其它元素，但這種方式比較麻煩的點是需要自己管理 `z-index` 的順序，而最近也有原生的 `<dialog>` 標籤可以協助我們做到這件事情了 %113%

::: info
`<dialog>` 標籤在 2022 年 3 月開始已經廣泛地被各個瀏覽器支援
:::

## modal 與 non-modal
在 `<dialog>` 元素開啟時，根據呼叫的方法會區分成以下兩種模式：

1. 透過 `show()` 開啟時為 non-modal
2. 透過 `showModal()` 開啟時為 modal

- non-modal
  - 允許使用者繼續跟頁面的其它元素互動
  - 無 `::backdrop` 偽元素作為背景
  - 無法透過 Esc 鍵關閉
- modal
  - 不允許使用者繼續跟頁面的其它元素互動
  - 有 `::backdrop` 偽元素作為背景
  - 可以透過 Esc 鍵關閉

## 屬性與方法

### 屬性
`open` (boolean) - 控制 `<dialog>` 是否向使用者顯示，但文件建議透過方法 `show()` 或是 `showModal()` 控制而非直接透過此屬性，透過此屬性開啟的 `<dialog>` 會是 non-modal 的形式

### 方法
`show` (method) - 以 non-modal 的形式開啟

`showModal` (method) - 以 modal 的形式開啟


## 最佳實作

### 在 ::backdrop 偽元素上加上背景樣式需求
但要注意的是 ::backdrop 偽元素只有在透過 `showModal()` 才會出現 

### 添加 autofocus 屬性到希望使用者第一時間互動的元素上
在 `<dialog>` 被打開後元素上的 `autofocus` 屬性可以協助瀏覽器定位使用者在打開視窗後的關注點，例如下一步等等的按鈕，如果沒有此類按鈕則建議加在關閉按鈕上 


## 在 Vue 中實作元件

### 基礎元件

這個步驟專注在以下幾個功能的實現：

1. 寫成 Vue 的元件，並可以透過 `v-model` 雙向綁定且自訂內容
2. 在 props 中新增布林值 `modal` 屬性讓使用者選擇以 modal 或是 non-modal 的方式開啟視窗
3. 修改 `::backdrop` 背景顏色
4. 透過 Slot props 匯出關閉元件的方法

#### 不具有 `modal` 屬性

這時的元件最大的特點就是不會被掛載到 DOM 中的 [#top-layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) 節點下：

<Button @click="withoutModalProperty = !withoutModalProperty">不具有 modal 屬性</Button>
<CustomDialog1 v-model="withoutModalProperty">不具有 modal 屬性</CustomDialog1>

```vue
<template>
  <dialog ref="dialog"> 
    <slot :close="close" />
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
    background-color: rgba(#222222, 0.75);
  }
</style>
```

#### 具有 `modal` 屬性

由於被掛載到 #top-layer 中，所以預設會吃到瀏覽器寫好的 `dialog:-internal-dialog-in-top-layer` 樣式：

<Button @click="withModalProperty = !withModalProperty">具有 modal 屬性</Button>
<CustomDialog1 v-model="withModalProperty" modal>具有 modal 屬性</CustomDialog1>

```css
dialog:-internal-dialog-in-top-layer {
  position: fixed;
  inset-block-start: 0px;
  inset-block-end: 0px;
  max-width: calc(100% - 2em - 6px);
  max-height: calc(100% - 2em - 6px);
  user-select: text;
  visibility: visible;
  overflow: auto;
}
```

### 擴充功能

在基礎元件的功能之外，我們也需要擴充一些常見的功能，包含：
1. 彈出時內容置中
2. 點擊內容以外的部分也能關閉視窗
3. 禁用背景的捲動條防止使用者捲動
   
#### 彈出時內容置中

在原有的 CSS 中加入以下樣式即可：

<Button @click="contentCentered = !contentCentered">彈出時內容置中</Button>
<CustomDialog2 v-model="contentCentered" modal>彈出時內容置中</CustomDialog2>

```vue
<style scoped>
dialog { /* [!code ++] */
  top: 50%; /* [!code ++] */
  left: 50%; /* [!code ++] */
  transform: translate(-50%, -50%); /* [!code ++] */
} /* [!code ++] */

dialog::backdrop {
  background-color: rgba(#222222, 0.75);
}
</style>
```

#### 點擊內容以外的部分也能關閉視窗

以往的方式是偵測滑鼠點擊的座標是否在內容顯示的範圍中，但現在我們用 `@vueuse` 提供的 `onClickOutside` 方法就可以簡單地做到這個判斷

<Button @click="clickOutsideToClose = !clickOutsideToClose">點擊內容以外的部分也能關閉視窗</Button>
<CustomDialog3 v-model="clickOutsideToClose" modal>點擊內容以外的部分也能關閉視窗</CustomDialog3>

```vue
<template>
  <dialog ref="dialog">
    <div ref="dialogContent"> <!-- 為了偵測內容的範圍這邊需要多一層 div 包住 slot -->
      <slot :close="close" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
  const dialogContent = ref<HTMLDivElement>(); // [!code ++]
  onClickOutside(dialogContent, close); // [!code ++]
</script>
```

#### 禁用背景的捲動條防止使用者捲動

在有彈出視窗的情況下禁用背景的捲動條是一個很常見的做法，其中也包含使用者體驗，當出現一個 modal 時應該要禁止使用者與 modal 以外的頁面內容互動，如果不實作這個功能就會出現使用者依然可以滑動背景的情況，會顯得有點突兀

<Button @click="hideOverflowWhenModalExists = !hideOverflowWhenModalExists">禁用背景的捲動條防止使用者捲動</Button>
<CustomDialog4 v-model="hideOverflowWhenModalExists" modal>禁用背景的捲動條防止使用者捲動</CustomDialog4>

```vue
<script setup lang="ts">
  // 新增一支函式檢查是否需要關閉 body 的捲動條
  function checkAndToggleBodyOverflow() {
    // 檢查開啟中的 dialog 數量，考量到可能會有複數個 dialog 同時開啟的情況所以不能將開關 overflow 的判斷寫在關閉函式中
    const openingModals = document.querySelectorAll('dialog[open]').length;

    // 如果還有開啟的視窗就隱藏捲動條
    if (openingModals > 0) {
      document.body.style.overflow = 'hidden';
    // 否則就顯示捲動條
    } else {
      document.body.style.overflow = '';
    }
  }

  function show() {
    // 根據 props.modal 決定呼叫的方法
    if (props.modal) dialog.value?.showModal();
    else dialog.value?.show();
    model.value = true; // 開啟後同步變更狀態

    checkAndToggleBodyOverflow(); // [!code ++]
  }

  function close() {
    dialog.value?.close();
    model.value = false;

    checkAndToggleBodyOverflow(); // [!code ++]
  }
</script>
```

## 相關連結

[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)