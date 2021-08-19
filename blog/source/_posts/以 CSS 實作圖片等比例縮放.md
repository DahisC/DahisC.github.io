---
title: 以 CSS 實作圖片等比例縮放
tags:
  - CSS
abbrlink: 35926
date: 2021-08-05 01:58:13
---

# 一些基本觀念

在 HTML 中，圖片以 `<img>` 標籤載入至頁面中後，會預設以圖片原始尺寸的寬高出現，這是 [置換元素 Replaced element](https://developer.mozilla.org/zh-TW/docs/Web/CSS/Replaced_element) 的特性之一

而 `<img>` 還有另一個特性是：如果我們只設定寬**或**高其中一項，則另一項就會按照圖片的原始比例縮放

假如有一張圖片原本是寬 200px \* 高 100px，這時候我們如果透過 CSS 重新指定圖片的高度為 25px，則寬度就會依照原本的比例變為 50px

善用這個特性就能讓圖片在縮放的同時也保有自身的原始比例

---

# 範例

直接上程式碼！！！

建議點選右上角的「EDIT ON CODEPEN」預覽 ^.<

<iframe height="265" style="width: 100%;" scrolling="no" title="等比例縮放圖片" src="https://codepen.io/DahisC/embed/RwKPGyz?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/RwKPGyz'>等比例縮放圖片</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

圖片等比例縮放－－這個效果在現今網站越做越精緻、RWD 變成每個前端工程師被動技能的年代，已經是一項沒辦法再隨便呼嚨過去的課題！！

以往總是將圖片直接設百分比卻從未了解其中的差異，在將各種縮放方法整理出來之後就清楚許多

接下來就以文字敘述搭配 Codepen 上的程式碼解說其中的差異～

## 原始尺寸

主管現在要求你放一張 200px\*100px 尺寸的圖片，但你也別真的就這樣放上去，不然主管等等還會找你

## width: 20%

有點經驗的前端工程師會立刻將圖片設定 `width: 20%`，圖片這時候就能輕易地做到隨著螢幕寬度縮放，也就是俗稱的 RWD

BUT！！！

如果今天使用者使用一台 Full HD (1920px\*1080px) 的螢幕觀看這張圖片會發生什麼事情？

原本寬度只有 200px 的圖片，硬是被拉伸至螢幕寬度的 20%，也就是 1920px\*20% = 384px

足足把圖片放大了一倍，前端工程師跟老家的阿嬤沒兩樣，很怕圖片沒吃飽

大部分的圖片都是點陣式圖片而非向量圖，只要寬度在超出原本的 200px 繼續向上伸展後，圖片只會變得越來越模糊

這時候該怎麼辦？

## width: 15.625vw

先解釋一下 15.625 這數字是怎麼跑出來的

將圖片的原始寬度 200px / 1280px = 0.15625
如果是以 Full HD 螢幕計算，就是 200px / 1920px = 0.10416

計算這個的用意是圖片在 1280px 寬度的情況時，圖片的大小應該會佔據螢幕的 15.625%，而在 1920px 時，只會佔據 10.416%

根據式子反推驗證，我們將 1280px \* 15.625% 就會得到 200px，1920px \* 10.416% 也會是 200px

意思是螢幕會在除數（1280px 或 1920px）的解析度下才開始依照自身比例縮放，而不像 `width: 20%` 從頭到尾都佔據螢幕寬度的 20%

如此一來，假如以現在最為普及的 Full HD 螢幕解析度 1920px 來看，大部分使用者在看到這張圖片時都不會看到它被拉伸超過自身寬度而導致模糊的情況

但在超過設定的解析度時，依然還是無法避免寬度被拉伸的結果

## width: 15.625%

跟上面一樣，但 vw 與 % 的差別就在於如果網站上出現了直向的捲軸，vw 不會扣除捲軸的寬度，而 % 會

## padding 的奇怪方法

待補
