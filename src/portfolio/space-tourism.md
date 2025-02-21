# Space tourism

切版練習

## 連結

- 網址：[Space tourism multi-page website](https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3)
- 線上網址：[Vercel](https://space-tourism-phi-two.vercel.app/)

## 技術
- Nuxt 3
- UnoCSS

### UnoCSS
#### 引入 `reset/tailwind.css`
  - 由於 UnoCSS 預設不會載入任何類似 Reset.css / Normalize.css 之類的樣式，為了保持不同瀏覽器上元素預設樣式的一致性，我選擇使用 tailwind.css 的 Preflight。比起 Normalize.css，Tailwind 進一步取消了 h1, h2... 等標籤的字型大小，保持這些字型的統一性可以讓我更方便地從頭建立一個網站。
  
#### 使用 presetMini 以減少 UnoCSS 體積
  - （解釋使用 presetMini 的原因）

## 踩到的雷

### Shortcuts 跟 Breakpoints 的命名衝突

```ts
export const presetSpaceTourism: Preset = {
  name: 'SpaceTourism',
  theme: {
    breakpoints: {
      tablet: '768px',
      desktop: '1440px',
    },
  },
  shortcuts: {
    // Typography
    'desktop-text-preset-2': 'font-bellefair text-[100px]',
    'tablet-text-preset-2': 'font-bellefair text-[80px]',
    'mobile-text-preset-1': 'font-bellefair text-[80px]',
  },
};
```

由於為了切合設計稿的 Design System 命名，所以 Typography 我也使用了類似 `mobile` `tablet` 的前綴，breakpoints 的區塊也同樣使用了 `mobile` `tablet`，但這種情況下會導致 UnoCSS 無法正確解析 Shortcuts。　

我的處理方法是將 breakpoints 的單字改成跟 Shortcuts 不一樣，並且使用原本 UnoCSS 的斷點系統兩個字母的命名規則，將 `tablet` -> `tl` 以避開這個問題