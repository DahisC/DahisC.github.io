---
title: 'JavaScript 中的 call, apply 與 bind'
abbrlink: 15787
date: 2021-08-12 18:14:22
tags:
---

# bind

> bind 的作用是改變函式中 this 的指向

## Example 1

```js
this.x = 9; // 此處的 this 指向全域物件 window
var obj = {
  x: 81,
  getX: function () {
    return this.x;
  },
};
var outerObj = {
  x: 5,
  innerObj: {
    x: 25,
  },
};

console.log(obj.getX()); // 81 - 如果透過物件呼叫方法，this 會指向物件
var a = obj.getX;
console.log(a()); // 9 - 雖然此處的 a 指向物件的方法，但是在全域底下呼叫函式，所以這時候的 this 指向的是 window
console.log(a.bind(obj)()); // 81 - 在全域底下呼叫此方法，並且強制此函式 getX 中的 this 重新指向 obj
console.log(a.call(obj)); // 此情況與上述寫法等價
console.log(a.bind(outerObj)()); // 5
console.log(a.bind(outerObj.innerObj)()); // 25
```

## Example 2

```js
function LateBloomer() {
  // 宣告一個工廠函式
  this.petalCount = Math.floor(Math.random() * 12) + 1;
}

LateBloomer.prototype.bloom = function () {
  // 在原型鏈中加入 bloom 方法
  window.setTimeout(this.declare.bind(this), 1000);
  // window.setTimeout(this.declare, 1000); // 會印出 I am a beautiful flower with undefined petals!
};

LateBloomer.prototype.declare = function () {
  // 在原型鏈中加入 declare 方法
  console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};

var flower = new LateBloomer(); // 長一朵花
flower.bloom(); // 使之開花
```

上述程式碼會經過以下階段：

1. 使用 `new LateBloomer()` 長一朵花，並且花瓣數量 `this.petalCount` 會透過 `Math.floor(Math.random() * 12) + 1;` 指定一個亂數
2. 讓上述步驟的花透過 `bloom()` 方法開花；在開花完畢之前會先因為 `setTimeout()` 延遲一秒開花
3. 在一秒後透過 `setTimeout()` 執行 `declare()` 方法，此處如果只寫成 `this.declare` 的話，會因為呼叫此方法的是 window 物件而顯示 `undefined`；為此需要透過 bind 重新綁定 `this` 的指向（指向花）

# apply

> apply
