---
outline: deep
---

# 肯德基優惠券網站

## 前言
身為一個愛吃垃圾食物的工程師如果能隨時知道最新的肯德基優惠券就太好了！

## 相關連結
- [線上網址](https://www.fatato.site/)

## 技術選擇
- Nuxt 3 / TypeScript
- Element Plus / Uno CSS / Normalize.css
- Pinia / [Pinia persisted state](https://github.com/prazdevs/pinia-plugin-persistedstate)
  - 初始化優惠券資料，並使用 Pinia 的插件 persisted state 暫存使用者進入網站後下載完的優惠券，避免使用者每次進入網站都需要呼叫一次 API
- Mongo DB / Mongo Atlas
  - 將優惠券資料送到 Mongo DB 的雲端 Atlas 上儲存
- Lodash
- Github Actions
  - 主要是把用來執行搜尋的腳本掛在 Workflows 底下每天自動執行
