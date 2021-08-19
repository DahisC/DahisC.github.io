---
title: HTML 常見問題
abbrlink: 65221
date: 2021-08-09 10:02:38
tags:
  - HTML
---

# doctype 是幹嘛用的？

What does a doctype do?

> `<!DOCTYPE>` 是告訴瀏覽器應該如何解讀文件格式用的述句（並不算是 HTML 標籤的一種），通常會寫在 .html 檔案的第一行。
>
> 現今的寫法裡，`<!DOCTYPE html>` 就代表了瀏覽器應該要以現今 html 5 標準解讀這份文件。

# 如何讓頁面的內容呈現在不同語言之上？

How do you serve a page with content in multiple languages?

> 題目指的應該是如何讓頁面在不同語言下呈現；一般會在 HTML 標籤中使用 `lang` 屬性標示該元素要在何種語言之下呈現，以美國來說是使用 `lang="en-US"`，台灣則是

# What kind of things must you be wary of when designing or developing for multilingual sites?

# data- 屬性的好處是？

What are data- attributes good for?

> `data-` 開頭的屬性給予了工程師自行在標籤中放入自定義屬性的彈性，在 `-` 之後可以任意使用自訂的單字，而屬性的值也沒有限制；如果搭配 JavaScript 透過 `element.dataset` 的方式讀取屬性的值的話，工程師就能在元素上放入只與該元素自身相關的屬性並延伸操作空間。

# Consider HTML5 as an open web platform. What are the building blocks of HTML5?

# Cookie / Local Storage / Session Storage 的差異？

Describe the difference between a cookie, sessionStorage and localStorage.

## Cookie

1. 大小限制為最高 4kb
2. 使用者瀏覽器中存放的 Cookie 可以由後端伺服器的 response header 寫入
3. 每次從瀏覽器送出請 request 時，Cookie 會自動地被夾帶在 request header 中
4. 可設定過期時間，時間到後會自動過期

## Local Storage

1. 大小限制為最高 5mb
2. 瀏覽器關閉後不清空

## Session Storage

1. 大小限制為最高 5mb
2. 瀏覽器（分頁）關閉後清空

# `<script>` / `<script async>` / `<script defer>` 的差異？

> `<script>` 標籤會按照順序執行，但由於執行到 `<script>` 標籤時瀏覽器會停止解析 DOM 轉而開始下載腳本，所以一般都會將 `<script>` 標籤放在 `<body>` 的閉合標籤之前；

Describe the difference between <script>, <script async> and <script defer>.

# Why is it generally a good idea to position CSS <link>s between <head></head> and JS <script>s just before </body>? Do you know any exceptions?

# What is progressive rendering?

# Why you would use a srcset attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.

# Have you used different HTML templating languages before?

# What is the difference between canvas and svg?

# What are empty elements in HTML ?
