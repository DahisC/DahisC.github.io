---
title: 兩分鐘將部落格系統 Hexo 部署至 Github Pages
abbrlink: 9721
date: 2021-06-27 14:29:32
tags:
  - Github Page
  - Hexo
---

![](github-pages.jpg)

# 前言

## 什麼是 Github Pages？

[Github Pages](https://pages.github.com/) 是 Github 提供的免費靜態網頁部署空間，每個帳號都可以免費獲得一個對應 Github 帳號的空間。

## 什麼是 Hexo？

[Hexo](https://hexo.io/zh-tw/) 是一個快速、簡單且強大的網誌框架。Hexo 使用 Markdown（或其他標記語言）解析您的文章，並在幾秒鐘內，透過漂亮的主題產生靜態檔案。

## 這文章要幹嘛？

用兩分鐘教你怎麼在 Github 上建立一個部落格系統！！！

---

# 前置作業

## 下載並安裝

1. Node.js
2. git

## 套件

1. `npm i hexo-cli -g`

---

# 步驟

> 以下的步驟都以 Github 帳號 _Hexo_ 為例

## 1. 在 Github 上[新增](https://github.com/new)一個公開儲藏庫

- 儲藏庫名稱為 _Hexo_.github.io

## 2. Clone 儲藏庫至本機並在根目錄中執行以下指令

```
hexo init blog
cd blog
npm i hexo-deployer-git
```

## 3. 更改根目錄中 \_config.yml 的部署設定

```yml
deploy:
  type: git
  repo: https://github.com/Hexo/Hexo.github.io
  branch: gh-pages
```

## 4. 在 /blog 底下執行以下指令

```shell
hexo clean // 清除快取檔案 (db.json) 和已產生的靜態檔案 (public)。
hexo deploy // 部署網站。
```

## 5. 更改儲藏庫設定

- [設定 Github Pages](https://github.com/DahisC/Amigo-TravelerMap/settings/pages) 的檔案來源

  1. 將 Branch 設定成 gh-pages
  2. 將資料夾設定為 /(root)

![](setting-github-pages.png)

## 6. 完成

- 部署的網站會出現在 https://Hexo.github.io/
  你剛剛建立好了自己的 Github Pages，並且也把部落格系統 Hexo 部署上去了，如果點進去是 404 請稍安勿躁，Github 設定可能需要幾分鐘的時間。

---

# 延伸閱讀

- [在 Hexo 中新增留言板插件 Gitalk](https://dahisc.github.io/posts/51727/)
- 如何將 Hexo 的文章網址縮短？
- 如何將作品集資料夾與 Hexo 部落格系統整合在 Github Pages 上？
