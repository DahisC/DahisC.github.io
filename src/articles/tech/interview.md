# 整理一些準備面試時發現的問題

## 常見問題

### 自我介紹

### 請分享一個你在開發中遇到「最大的技術挑戰」，你是如何解決的？

【情境與問題 (Situation/Task)】
「在我前公司（剛起步階段），開發節奏非常快，當時為了追求更新速度，專案累積了不少技術債。我入職時，業務邏輯已經變得相當複雜，雖然還沒正式上線，但我發現既有的程式碼存在很多重複邏輯，且沒有遵守單一事實來源 (SSOT) 的原則，導致後續功能極難擴充。」

【解決行動 (Action)】
「當時我被指派開發新功能，但我認為如果不解決根源問題，未來的開發成本會越來越高。

- 架構梳理： 我先花了一週時間完整梳理既有架構，並主動找技術主管溝通，分析現況並提議重構的可能性。

- 模組化實作： 得到認可後，我花了約三週時間進行重構。核心做法是將共用的 UI 抽成組件 (Components)，並利用 Vue 3 的特性將複雜的業務邏輯封裝成 Composables。

【最終結果 (Result)】
「重構後的程式碼順利通過測試上線。最直接的成效是，因為大幅提升了代碼的複用性，後續開發同類型新需求的時間節省了約 70%。這套邏輯架構一直到我離職時，公司團隊都還在持續沿用，這對我來說非常有成就感。」



## 程式相關

### Vue

[Suspense](https://vuejs.org/guide/built-ins/suspense)

### Nuxt

[useFetch](https://nuxt.com/docs/4.x/api/composables/use-fetch)

### JavaScript

[AbortController](https://developer.mozilla.org/zh-TW/docs/Web/API/AbortController)

### CSS
[Sass 7–11 Pattern](https://medium.com/@zalexzuo/sass-7-1-pattern-%E5%A4%A7%E5%B9%85%E6%8F%90%E5%8D%87%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A2%BC%E7%B6%AD%E8%AD%B7%E6%95%88%E7%8E%87%E7%9A%84%E6%9E%B6%E6%A7%8B%E8%A8%AD%E8%A8%88-578b43b71365)
> 在 SASS 中常見的架構 7–11 Pattern（Seven One Pattern），意思就是 7 個資料夾與 1 個檔案，使用這種架構可以很好的把負責不同功能以及區塊的 CSS 程式碼依照邏輯區分開來，在中大型的專案中能讓代碼有更高效的維護性。
>
> main.css / base, abstracts, components, layout, pages, themes, vendors


[全面解析 Design token 在設計系統的運用](https://medium.com/uxcircles/%E5%85%A8%E9%9D%A2%E8%A7%A3%E6%9E%90-design-token-%E5%9C%A8%E8%A8%AD%E8%A8%88%E7%B3%BB%E7%B5%B1%E7%9A%84%E9%81%8B%E7%94%A8-e0e2b1832a73)
> Design tokens 其實是系統內對於重複性的視覺元素的「代稱」，我們給予不同顏色、字型、間距、圓角、等視覺元素，一個工程師和設計師都可以輕易理解的名稱，取代原先的靜態值（如：hex 色碼、數值），而這樣的名稱，可以在程式碼、設計、團隊溝通、平台保持一致性，同時保有擴充性。

[淺談 BEM CSS - CSS 設計模式與架構](https://w3c.hexschool.com/blog/35afa83f)

[CSS @layer 分層優先順序](https://steam.oxxostudio.tw/category/css/content/layer.html)