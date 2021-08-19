---
title: Amigo - 旅人地圖
tags:
  - Bootstrap
  - Laravel
category:
  - Portfolio
abbrlink: 63535
date: 2021-06-28 13:20:16
---

![](map.png)

> **Amigo 是每個人的旅人地圖，記錄著那些短暫出現卻又精彩萬分的事物**

![](homepage-preview.png)

---

# 相關連結

- [Amigo - 旅人地圖官方網站](https://110-03-nchu-amigo.dev-hub.io/)

# 關於 Amigo

## 設計主軸

> **突然不知道要去哪裡？**

Amigo 是基於地圖提供的服務，讓使用者出門時如果臨時想查詢附近有什麼活動可以參與，只要透過阿米狗的地圖功能就能快速地發現附近那些所有好玩的地點！

不只是一般的餐廳、景點這種靜態的地點，也能夠顯示像是小型演唱會、市集、祭典、展覽這種短時間的活動。

除此之外，Amigo 也可以讓旅人們把這些喜歡的地點收藏在自己的個人地圖中，並且將自己的個人地圖網址分享給其它旅人；而每張個人地圖又都可以再匯出成行程表寄送到信箱或轉成 PDF 檔案輸出，讓出遊的旅人可以更方便地管理自己的行程。

## 網站功能

1. 有趣的地點 Attractions
   不同於一般的地圖，Amigo 也蒐集了那些有趣的地點，像是街頭藝人的表演、某個地區的祭典、短時間展出的活動等等。

2. 地圖 Map
   將有趣的地點整理在地圖服務中，並讓使用者可以透過地圖旅行以及規劃個人地圖。

3. 行程表 Itineraries
   將個人地圖中的地點寄送至使用者的信箱或者是匯出成 PDF，讓使用者在旅行的過程中可以更方便地瀏覽這些資訊。

---

# 關於此作品

> Github Repository [Amigo - TravelerMap](https://github.com/DahisC/Amigo-TravelerMap)

這個作品是於 2021 年參加職訓時的團體專題題目，班上一共分成 6 組／每組 5 人，由於當時參加職訓之前就有工程師的經驗（班上大多數同學都沒有相關背景；職訓的課程為三個月，內容涵蓋了前端與後端相關技術），所以我也因此被指派為小組組長，整個專題的開發時程約一個月。

透過這次的組長經驗，學習到了如何從頭到尾規劃一次完整的開發流程，並且也以當初工程師學到的技術引導小組成員開發此作品。

# 開發流程

|   123    |                               工具                               |          圖片          |
| :------: | :--------------------------------------------------------------: | :--------------------: |
| 進度規劃 | [Notion](https://www.notion.so/943a743b56ad4e66bb511cd3f50e96eb) |                    |
|  心智圖  |                               Miro                               | [圖片 1](mind-map.jpg) |
| 網站地圖 |                               Miro                               | [圖片 1](site-map.jpg) |
|  線框稿  |                              Figma                               |                      |
|  視覺稿  |                              Figma                               |                     |

# 使用技術

|          |                              技術／套件                              |
| :------: | :------------------------------------------------------------------: |
| 前端框架 |                                 Vue                                  |
| 前端套件 | [Intro.js](https://introjs.com/) / [Leaflet](https://leafletjs.com/) |
| CSS 框架 |        Bootstrap 5 + [MDBootstrap](https://mdbootstrap.com/)         |
| 後端框架 |                              Laravel 7                               |
|  資料庫  |                                MySQL                                 |

# 我負責的工作

## 團隊

- 以標準的 Github 開發流程同步程式碼
  由於職訓的課程並未完整介紹 Github Branch / Pull Request 的功能，所以為了讓組員可以更方便地同步彼此的程式碼，我將這套開發流程引入了這次的團體專題中。

  分支分為開發 development 與生產 production 用的分支，並且對此二分支設了分支保護。
  也要求成員在提交 Pull Request 時需要指定我為 Reviewer，而我也會檢查大家程式碼的撰寫方式與要求程式碼風格（程式碼風格也有統一使用排版套件管理），並適時地給予[撰寫建議](https://github.com/DahisC/Amigo-TravelerMap/pull/44)。

- 以 Notion 進行討論
  Notion 主要是由另一位團隊成員 C 推坑給我，並且在發現 Notion 真的很好用後就開始認真地在 Notion 上與成員 C 共同規劃團隊進度與整理開發文件。
  - 🔗 [團隊進度 (Notion)](https://www.notion.so/943a743b56ad4e66bb511cd3f50e96eb)
  - 🔗 [相關文件 (Notion)](https://www.notion.so/fafd0d0421aa4bc8b7297e5341e3ec35?v=8e9230e23e314e3d8396fc40e3983fe1)
  - 🔗 [會議記錄 (Notion)](https://www.notion.so/a0074213ee6d44439ceb64213669b0bf?v=bd5bce8b22fe40a68098deb5a8dc20eb)

## 企劃

- 主要企劃
  主題的發想是由另一位成員 S 提出，在團隊同意以此主題作為開發目標時我則負責收集大家意見，並根據心智圖規劃必要功能，在討論的過程中也會就技術的可行性與否進行功能的刪減。

- 進度規劃
  接著使用 Notion 的功能預先排好了約接下來一個月大致應該要完成的功能，再以卡片式的管理方式與團隊成員討論。

  🔗 [進度規劃 (Notion)](https://www.notion.so/943a743b56ad4e66bb511cd3f50e96eb)
  🔗 [進度規劃 (image)](notion-progression.png)

- 線框稿繪製
  　由於設計方面團隊決議由我與另一位團隊成員 C 擔當，所以線框稿由我與 C 共同繪製。

  🔗 [線框稿 Wireframe (Figma)](https://www.figma.com/file/q9vcJwvKaEzpASradvq6dL/Amigo-%E7%B7%9A%E6%A1%86%E7%A8%BF-Wireframe?node-id=0%3A1)

- 視覺稿設計
  在視覺稿的階段，主要由我制定關於字體、版面的編排方式，並由團隊成員 C 決定網站配色。

  🔗 [視覺稿 Mockup (Figma)](https://www.figma.com/file/BoRbTIjRXJ6e0zjadg2Awq/Amigo-Wireframe-and-Mockup?node-id=0%3A1)

## 設計

- Logo
  由於此次的職訓課程也有教到關於 Illustrator 的使用方式，所以也參與了網站 Logo 的設計。

  🔗 [Logo 設計過程](https://www.notion.so/Dahis-Amigo-Logo-77cb7e93c85e46bb9f099185e135bdf2)
  🔗 [Logo (image)](logo.svg)

- 網站配色
  雖然網站最後使用的配色已經大幅改變，但在一開始時其實也有要求大家一起集思廣益，而這份文件則是我對當時網站風格的配色方案。

  🔗 [網站配色方案 (Notion)](https://www.notion.so/Dahis-58f4872bbeb34cd9851691a2a9e5f8a4)

- 文案撰寫
  由我與成員 C 共同撰寫。

- 網站插圖
  網站插圖來自另一位認識的設計師，所以在開發專題時我也與該設計師一起制定網站的插圖風格與吉祥物設定。

## 前端

- 主要切版
  由於其它兩位預計與我一起負責前端的同學相對比較沒經驗，所以切版的工作主要由我負責。

- 地圖功能
  由於 Amigo 本身是以基於地圖而延伸的服務，所以在地圖的套件上我們使用了開源的 JavaScript 地圖套件 Leaflet 進行開發。
  在開發過程中沒有遇到什麼太大的問題， 但由於這次是用 Laravel 開發，原先伺服器端算繪（SSR）的方式使用在地圖的搜尋與更新上就會影響使用者體驗，
  所以在開發後期時為了解決使用者可能會頻繁更新網頁的問題，也透過 Vue + AJAX 的方式更新使用者的畫面。

- 操作導覽
  導覽的功能則以 [Intro.js](https://introjs.com/)實作，透過這種方式在介面較為簡潔的頁面中加入適當的引導效果。

## 後端

- [資料表規劃](https://dbdiagram.io/d/60a7a07db29a09603d15f05a)
  雖然關聯式資料庫也是在職訓時才接觸，但在了解大致上的資料表結構後也要求組員至少以第三正規化（3NF）的方式實作資料庫關聯。
  當時會與後端組員一起討論資料表欄位的資料型態，以及負責檢查資料表之間的從屬與對應關係等等。

  🔗 [資料庫架構表 (url)](https://dbdiagram.io/d/60da7655dd6a59714823b305)
  🔗 [資料庫架構表 (img)](database-diagram.png)

- 技術支援
  團隊中有另外兩位組員 C 與 D 負責後端的功能開發，身為組長的我則是在查詢某項功能需要透過哪些 Laravel 功能實作後將工作分派給這兩位成員研究並實作。
  並且因為之前有 Node.js 的開發經驗所以在後端的學習進度上也比較得心應手，所以也會支援一些後端比較困難的程式邏輯。
  舉例來說像是透過 Seeder 將政府的 API 資料存入資料庫、透過 Google Geocoding 的方式解析目標地址的經緯度、撰寫地圖的搜尋邏輯與資料庫查詢等等。

---
