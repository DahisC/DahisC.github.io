---
title: Float & Clear
abbrlink: 10023
date: 2021-08-05 03:30:09
tags:
  - CSS
---

# 屬性

## float

> 使用 `float` 時先想像網頁上多出了 Z 軸，而被套用 `float` 屬性的元素則會**往上漂浮**，這時的元素會被區分成上層（漂浮元素）與下層（未套用 `float` 的元素），在未使用 `clear` 屬性時，上層與下層元素之間的排版不會互相影響。

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="DahisC" data-slug-hash="poNGLPB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Float 切版練習預設模板">
  <span>See the Pen <a href="https://codepen.io/DahisC/pen/poNGLPB">
  Float 切版練習預設模板</a> by DahisC (<a href="https://codepen.io/DahisC">@DahisC</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## clear

> `clear` 屬性會忽略上方（HTML 的撰寫順序）*同邊元素*的漂浮效果，意思就是 `clear: left` 就會忽略 `float: left`，使元素在碰到**第一個**同邊元素後停止。

<iframe height="265" style="width: 100%;" scrolling="no" title="clear 屬性" src="https://codepen.io/DahisC/embed/OJbdvQw?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/OJbdvQw'>clear 屬性</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

# 練習

以下列程式碼作為基礎模板，嘗試以 CSS 屬性 `float` 與 `clear` 練習切版。

<iframe height="265" style="width: 100%;" scrolling="no" title="jOVdzrX" src="https://codepen.io/DahisC/embed/jOVdzrX?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/jOVdzrX'>jOVdzrX</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 切版練習 1

![切版練習 1](layout_1.jpg)

<iframe height="265" style="width: 100%;" scrolling="no" title="Float 切版練習 1" src="https://codepen.io/DahisC/embed/MWbLVyR?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/MWbLVyR'>Float 切版練習 1</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 切版練習 2

![切版練習 2](layout_2.jpg)

<iframe height="265" style="width: 100%;" scrolling="no" title="Float 切版練習 2" src="https://codepen.io/DahisC/embed/WNoPzGa?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/WNoPzGa'>Float 切版練習 2</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 切版練習 3

![切版練習 3](layout_3.jpg)

<iframe height="265" style="width: 100%;" scrolling="no" title="Float 切版練習 3" src="https://codepen.io/DahisC/embed/RwovMoZ?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/RwovMoZ'>Float 切版練習 3</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 切版練習 4

![切版練習 4](layout_4.jpg)

<iframe height="265" style="width: 100%;" scrolling="no" title="Float 切版練習 4" src="https://codepen.io/DahisC/embed/bGBzvBj?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/DahisC/pen/bGBzvBj'>Float 切版練習 4</a> by DahisC
  (<a href='https://codepen.io/DahisC'>@DahisC</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 切版練習 5

![切版練習 5](layout_5.jpg)

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="DahisC" data-slug-hash="MWbLqXm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Float 切版練習 5">
  <span>See the Pen <a href="https://codepen.io/DahisC/pen/MWbLqXm">
  Float 切版練習 5</a> by DahisC (<a href="https://codepen.io/DahisC">@DahisC</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 切版練習 6

延續練習 5，但在不同顏色的區塊之間加入 10 px 的間距。（以 padding 與 margin 實作）

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="DahisC" data-slug-hash="mdOoywa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Float 切版練習 5">
  <span>See the Pen <a href="https://codepen.io/DahisC/pen/mdOoywa">
  Float 切版練習 5</a> by DahisC (<a href="https://codepen.io/DahisC">@DahisC</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- 注意事項：
  - margin 的套用順序以 HTML 的撰寫順序為主，由前推後（上推下）
    - header 推 main、mainL 推 mainR、main 推 footer
  - padding 會將原本的容器撐開，所以需要在容器原本的長寬上扣除 padding 的值
    - 假設原本為 800\*600，在下 `padding: 10px` 之後則為 780\*580

## 切版練習 7

延續練習 6，但將尺寸設定為 1024\*768，並將間距改為 20px。

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="DahisC" data-slug-hash="qBqvOwm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="float 切版練習 7">
  <span>See the Pen <a href="https://codepen.io/DahisC/pen/qBqvOwm">
  float 切版練習 7</a> by DahisC (<a href="https://codepen.io/DahisC">@DahisC</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
