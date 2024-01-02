---
title: Hydration 是什麼？
abbrlink: 50493
date: 2024-01-02 10:16:56
tags:
  - Nuxt
---

# 起因

在使用 Nuxt 3 開發的過程，偶爾可以看到類似的警告

```
[Vue warn]: Hydration node mismatch:
- rendered on server: <div data-v-inspector=​"pages/​test.vue:​2:​3">​Nuxt​</div>​  
- expected on client: a 
  at <Test onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <Anonymous key="/test" vnode= {__v_isVNode: true, __v_skip: true, type: {…}, props: {…}, key: null, …} route= {fullPath: '/test', hash: '', query: {…}, name: 'test', path: '/test', …}  ... > 
  at <RouterView name=undefined route=undefined > 
  at <NuxtPage> 
  at <App key=3 > 
  at <NuxtRoot>
```

有時候 `node` 可能會替換成 `content`；`node` 代表的是元素節點，`content` 則是元素的內容。

這也引起了我的好奇，究竟 Hydration 是什麼？又為什麼會造成這種情況？

# Hydration 是什麼？

**Hydration** 的中文是水化，代表的是物質與水結合的過程。

應用在網頁開發中時，指的是將透過 SSR（Server-Side Rendering）提供的靜態頁面與事件綁定，**使其轉變為使用者可與之互動的介面**。
在這個過程中，一般會將 Vue、React 等前端框架中的互動功能、又或者是原生的 JavaScript 事件注入靜態網頁中。

# 延伸

## Nuxt 中的 Hydration node mismatch

### 如何觸發

要了解原因，首先要知道如何觸發這個問題。

在 Nuxt 中，寫一個元件，內容如下：

```vue
<template>
  <div v-if="i === 1">Nuxt</div>
  <a v-else>Hydration</a>
</template>

<script setup lang="ts">
const i = Math.floor(Math.random() * 2);
</script>
```

接著啟動開發伺服器，重新整理多次應該就能看到文章開頭的警告訊息。

### 為什麼會觸發？

根據一開始所提，**Hydration** 會在接收到伺服器後端生成的靜態頁面後開始綁定事件到元素上，而 *Hydration node mismatch* 代表在綁定的過程中，最終呈現的元素與後端生成時的元素不同，所以會跳此警告。

### 要如何解決？

1. 拿掉在 `v-if` 中的完全隨機條件，讓最終呈現的元素與生成時相同即可解決此問題，請注意，這邊提到的是 **完全隨機**條件，一般的判斷如果不會有這種完全隨機的情況是不影響的。

2. 使用 `<ClientOnly>` 元件包裹可能會隨機生成的元素，使其不先透過 SSR 產生靜態頁面，故也能避免 Hydration 的過程。