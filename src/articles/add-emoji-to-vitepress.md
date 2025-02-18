---
outline: deep
---

# 在 VitePress 中新增表符吧

這是一篇因為以往在噗浪上寫文章的時候總是有許多表情符號可以使用，所以一轉來 VitePress 就覺得有點不太習慣，於是決定在這個系統中新增表情符號的故事。

然後還是必須要稱讚一下 Line 這組免費的表情符號真的是太可愛了 %117%

## 先用 Vue 組件實作吧

由於 VitePress 可以自訂組件並且透過 Markdown 解析，所以這是初步的想法，計畫如下：

1. 建立一個 Emoji 組件，並且根據 `props` 顯示對應的表情符號
2. 讓 VitePress 偵測特定的字元並且載入 Emoji 組件
3. 在 Emoji 組件中根據 `name` 載入對應的表情符號

### 建立一個 Emoji 組件

在 `src/components` 底下新增一個 `Emoji.vue`

```vue
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
```

接著在 `.vitepress/theme/index.ts` 中作為 Vue 的全域組件引入

```ts
export default {
  enhanceApp({ app, router, siteData }) {
    app.component('Emoji', Emoji); // [!code highlight]
  },
} satisfies Theme;
```

接著在 `.vitepress/config.mts` 中加入偵測 Markdown 語法的邏輯

```ts
export default defineConfig({
  markdown: {
    config: (md) => {
      md.renderer.rules.text = (tokens, idx) => {
        let text = tokens[idx].content;

        // 偵測 `%...%` 內的內容
        text = text.replace(/%([a-zA-Z0-9_]+)%/g, (_, name) => {
          return `<Emoji name="${name}" />`;
        });

        return text;
      };
    },
  },
})
```

如此一來，當在 VitePress 中使用 `%` 符號包住文字，文字就會作為 `name` 傳入 Emoji 組件的 `props`，並且到 `src/public/emoji/` 路徑底下載入對應檔名的圖片。

## 可以不透過組件的方式載入嗎？

既然現在的順序是透過 Markdown 語法偵測 `%` → 載入 Emoji 組件 → 在組件中載入 `img` 元素，那是不是在 `config.mts` 中直接略過載入組件的步驟會更快？

原本是這樣想的，但想想 Vue 的組件其實可以統一邏輯，除此之外也方便我在 `img` 上的 `onerror` 屬性寫相關的錯誤處理函式，甚至也能用 `<style scoped>` 進一步限制表情符號需要的樣式，所以決定還是維持目前的寫法就好。

就這樣，終於可以在網誌中方便地使用表情符號了！！！ %136%