---
outline: deep
---

# 在 VitePress 中新增表符吧

這是一篇因為以往在噗浪上寫文章的時候總是有許多表情符號可以使用，所以一轉來 VitePress 就覺得有點不太習慣，於是決定在這個系統中新增表情符號的故事。

## 先用 Vue 組件實作吧

由於 VitePress 可以自訂組件並且透過 Markdown 解析，所以這是初步的想法，計畫如下：

1. 建立一個 Emoji 組件，並且根據 `props` 顯示對應的表情符號
2. 讓 VitePress 偵測特定的字元並且載入 Emoji 組件

### 建立一個 Emoji 組件

在 `src/components` 底下新增一個 `Emoji.vue`


%helloasd%