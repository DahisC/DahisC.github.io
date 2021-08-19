---
title: （筆記）JavaScript 全攻略：克服 JS 的奇怪部分
abbrlink: 10027
date: 2021-08-10 15:48:34
tags:
---

# 詞彙環境 Lexical Environment

程式碼被實際撰寫的位置，而撰寫的位置則會影響 Scope Chain；在 JavaScript 中，重要的不是撰寫的上下順序，而是變數的位置之外是否有被函式包住

# undefined

- 在創造階段時，JavaScript 會先將所有變數的宣告放進記憶體，接著賦予 undefined 這個特殊的值
- undefined 應該被視為你沒有賦予這個值變數，所以不主動將 undefined 賦值給變數有助於排除錯誤

# 關於 JavaScript 的引擎

- 單執行緒 Single Threaded
  - 一次只執行一個指令
- 同步 Synchronous
  - 程式碼依照出現的順序，一次只執行一行

# 執行堆 Execution Stack

![](1.png)

- 堆疊結構（先進後出）
- 最下層的會是全域執行環境 Global Execution Context
- 每次呼叫函式，JavaScript 就會創造一個專屬於該函式的 Exection Context 並放進 Exection Stack 中

# 範疇 Scope

> 變數可以被取用的範圍（像是函式中宣告的變數，可以在此函式以內被使用）

```js
function A() {
  var v = 1;
  console.log(v); // 1: 變數在範疇之中
}
console.log(v); // Reference Error: 變數不在範疇之中
A();
```

# 範疇鍊 Scope Chain

> 變數可以被取用的所有範圍（向外尋找；如果一個）

```js
function A() {
  var v = 1;
  function B() {
    console.log(v); // 1: 雖然在 B() 的範疇中未找到 v，但外層的 A 函式也屬於 B 函式的範疇鍊，所以印出 1
  }
  B();
}
console.log(v); // Reference Error: 變數不在範疇之中
A();
```

# 瀏覽器的引擎與底層運作方式
> 在瀏覽器中，處理 JavaScript 的引擎是以**同步**的方式處理所有指令，然而瀏覽器也能觸發非同步回呼的函式（Asynchornous callbacks），原因是因為除了有引擎在處理 JavaScript 以外，也同時有其它引擎在處理其它部分，像是繪製（或渲染 Rendering）、HTTP 請求，這些都與 JavaScript 分屬不同的引擎，而透過 JavaScript 執行這些請求時，就相當於將做這些事情的控制權交到這些引擎手中。

# JavaScript 如何處理非同步事件

> JavaScript 使用一個稱為事件佇列（event queue）的方式同步地處理非同步的這些事件，且當 JavaScript 本身的執行堆中都處理完畢時，才會將事件佇列的事件放進執行堆中執行。

```js
// long running function
function waitThreeSeconds() {
    var ms = 3000 + new Date().getTime();
    while (new Date() < ms){}
    console.log('finished function');
}

function clickHandler() {
    console.log('click event!');   
}

// listen for the click event
document.addEventListener('click', clickHandler);


waitThreeSeconds(); // 這邊觸發的函式，會先被放入執行堆中
console.log('finished execution');
```

按照範例，我們在 document 上加入了一個點擊事件的監聽器，並且在打開網頁時會先觸發 `waitThreeSeconds()` 函式，同時在 `waitThreeSeconds()` 卡住渲染引擎的同時，點擊一次按鈕，這時候的引擎狀態應該如下： 

- 執行堆
  - `waitThreeSeconds()`
  - `Global`

- 事件佇列
  - `clickHandler()`

這時候打開瀏覽器，會發現控制台以下面的順序印出文字：

1. finished function -> 來自 `waitThreeSeconds()` 函式，執行堆中的最上層
2. finished execution -> 來自全域，執行堆中的最下層
3. click event! -> 來自事件佇列的 `clickHandler()`，當 1. 與 2. 從執行堆中離開時，它會被放到執行堆中

