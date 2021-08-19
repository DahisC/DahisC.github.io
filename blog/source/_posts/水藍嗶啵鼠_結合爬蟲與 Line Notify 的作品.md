---
title: 水藍嗶啵鼠 - 結合爬蟲與 Line Notify 的作品
abbrlink: 63534
date: 2021-07-09 16:52:54
category:
  - Portfolio
tags:
  - Line Notify
  - Web Crawler
---

# 關於此作品

> 將遊戲內的世界頻道訊息推播到 Line 上 - 使用 Node.js 的爬蟲與 Line Notify API 實作

> Github Repository [bluecg-wc-notify-v2](https://github.com/DahisC/Amigo-TravelerMap)

- 使用 Node.js / express 作為後端系統並撰寫爬蟲透過撈取資料
- 透過 Line Notify 推播（Chatbot 要錢 QQ）

# 使用技術

|            |    技術／套件     |
| :--------: | :---------------: |
|  後端框架  | Node.js / express |
|  爬蟲套件  |      cheerio      |
|  部署環境  |      Heroku       |
| 第三方 API |    Line Notify    |

主要是透過將 Node.js 的環境架設在 Heroku 上，並以 express 作為後端框架每隔一段時間從遊戲論壇上撈取最新的世界頻道訊息，再透過 Line Notify 主動推播給訂閱服務的使用者。

但由於當時未透過套件介接 Line Notify 的 API，也因此衍伸出了之後自己開發並發布到 NPM 上的套件 [line-notify](#) 試圖簡化介接這類以 Oauth 2 為標準的 API 之間繁瑣的溝通過程。

# 實際畫面

![](S__9093171.jpg)
![](S__9093173.jpg)

# tl;dr

- 作品其實叫水藍嗶啵鼠（水藍是伺服器的名字，嗶啵鼠則是遊戲中的道具，會發出各種提醒！）
- 還有一張很可愛的 Logo
- 魔力寶貝很好玩

![](logo.jpg)
