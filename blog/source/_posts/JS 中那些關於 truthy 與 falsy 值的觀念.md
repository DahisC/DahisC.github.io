---
title: JS 中那些關於 truthy 與 falsy 值的觀念
abbrlink: 10024
date: 2021-08-05 05:21:24
tags:
  - JavaScript
---

最近在看犀牛書時發現幾個以前沒辦法理解的觀念，趁還沒忘記在這邊紀錄一下！！

---

```js
if (new Boolean(false)) {
  console.log(1);
} else {
  console.log(2);
}
```

> Ｑ：在這情況下會印出 1 還是 2？

答案是 1，原因是 `new Boolean(false)` 會產生一個 Boolean 物件，而 JS 會將所有的物件當作 truthy 值，如果我們用 `typeof` 檢視就能發現它的類別。

```js
typeof new Boolean(false); => "object"
```

意思就是，只要在 `if()` 中的東西是個物件，JS 根本不會理會它裡面的值，所以就算將 `if (new Boolean(false))` 改為 `if (new Boolean())` 也會得到一樣的結果，因為它們**都是物件**。

> BUT！如果這時候我們做以下的比較，會是 true 還是 false？

```js
new Boolean(false) === true; // 注意這邊用的是嚴格相等運算符(===)，而非一般相等(==)
```

答案會是 false，但奇怪的是剛剛的 if 不是將 `new Boolean(false)` 視為 true 了嗎？

剛剛提到 `typeof new Boolean(false)` 的結果會是 object（物件），而物件在使用嚴格相等運算符進行比較時，**比較的是它的*參考*（by reference），而非*值*（by value）**。

_by reference_ 的意思是在比較時，只有在等號左右兩邊都指向同一個物件，其值才會是 true；_by value_ 的意思則是只要在等號的左右兩邊都是相同的值，就會是 true。

以這個邏輯進行測試，可以得到以下結果：

```js
new Boolean(false) === true; => false
new Boolean(true) === true; => false
```

因為物件並未指涉（refer to）到自己，所以就算值相同也不會成立。唯一能讓此相比情況成立的方法是左右兩邊都指涉到同一個物件，像是：

```js
var obj_1 = new Boolean(false);
var obj_2 = obj_1;
obj_1 === obj_2 => true
```

> 那如果是以一般相等運算符（==）進行比較的話，new Boolean(false) == false 的結果是？
