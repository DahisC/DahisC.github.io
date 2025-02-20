# Space Tourism

## 技術
- Nuxt 3
- UnoCSS

### UnoCSS
#### 引入 `reset/tailwind.css`
  - 由於 UnoCSS 預設不會載入任何類似 Reset.css / Normalize.css 之類的樣式，為了保持不同瀏覽器上元素預設樣式的一致性，我選擇使用 tailwind.css 的 Preflight。比起 Normalize.css，Tailwind 進一步取消了 h1, h2... 等標籤的字型大小，保持這些字型的統一性可以讓我更方便地從頭建立一個網站。
  
#### 使用 presetMini 以減少 UnoCSS 體積
  - （解釋使用 presetMini 的原因）

## 踩到的雷

### Attributify 不支援 bg-[url()] 的寫法

雖然 UnoCSS 有使用 Attributify asset，但以下這種寫法卻無法正常在斷點 `tablet` `desktop` 之間切換背景圖片

```vue
    <main
      class="p-6 grow-1 bg-[url('@/assets/home/background-home-mobile.jpg')]"
      tablet="bg-[url('@/assets/home/background-home-tablet.jpg')]"
      desktop="bg-[url('@/assets/home/background-home-desktop.jpg')]"
    >
    </main>
```

但如果改成 class 內而不使用屬性的話，相同的寫法是能生效的

```vue
    <main
      class="p-6 grow-1 bg-[url('@/assets/home/background-home-mobile.jpg')] tablet:bg-[url('@/assets/home/background-home-tablet.jpg')] desktop:bg-[url('@/assets/home/background-home-desktop.jpg')]"
    >
```

但如果先將 `bg-[url('@/assets/home/background-home-mobile.jpg')]` 這樣的字串放到 Shortcuts 中再引入的話，可以成功作用；例如在 `uno.config.ts` 中宣告一行 `bg-home-tablet: bg-url[('@/assets/home/background-home-tablet.jpg')]` 後在屬性中引入：

```vue
    <main
      class="p-6 grow-1 bg-[url('@/assets/home/background-home-mobile.jpg')]"
      tablet="bg-home-tablet"
    >
    </main>
```