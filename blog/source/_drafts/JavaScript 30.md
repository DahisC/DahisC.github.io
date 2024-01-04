---
title: JavaScript 30
abbrlink: 58388
date: 2021-06-27 14:58:44
tags:
  - JavaScript
---

# [06 - Type Ahead](<(https://github.com/DahisC/JavaScript30/blob/main/06%20-%20Type%20Ahead/index-START.html)>)

## 如何在數字中加入千分位逗號？

1. 透過正規表達式

   ```js
   string.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   string.replace(/\B(?=(\d{3})+\b)/g, ','); // 另一個寫法
   ```

   - [https://juejin.cn/post/6844903609029623815](https://juejin.cn/post/6844903609029623815)

2. 透過 JavaScript 的內建函式

   ```js
   Number(string).toLocaleString(); // 可能有兼容性的問題
   ```

# 07 - Array Cardio Day 2
