---
title: Json Web Token
abbrlink: 6430
date: 2021-07-04 16:23:24
tags:
  - JWT
---

# 什麼是 Json Web Token？

> Json Web Token aka. JWT 是依據 [RFC 7519 開放標準](https://datatracker.ietf.org/doc/html/rfc7519) 實作的授權（Authorization）機制。
> 麻雀雖小且五臟俱全（a compact and self-contained way）的方式使其可以安全地透過 JSON 格式進行資訊交換，並因數位簽章的機制使其儲存的資料可被信任並通過驗證。
> 加密數位簽章的演算法是使用 HMAC 演算法、或者是以 RDS 或 ECDSA 的公私鑰演算法加密。

[延伸閱讀：Authorization 與 Authentication 的差別？](#)

> 白話：JWT 以 JSON 格式儲存資料、並且經過演算法加密與編碼過的格式不但小而且也有方式可以驗證其資料有沒有被竄改

# 為什麼應該要用 JWT？

- 授權 Authorization

  使用 JWT 最常見的原因。一旦使用者登入後，其後所有的請求都會夾帶 JWT，允許使用者透過此權杖進行各種動作（進入頁面、使用服務、取得資源等等）。
  而單一登入（Single Sign On）的功能也是現今 JWT 被廣泛使用的原因之一，因其小而精巧的格式與儲存資訊的方式可以被簡單地應用在不同網域的系統中。

> 白話：JWT 很小很方便還能儲存資訊，可以拿來解決平常 Session 遇到的限制－－像是使用者在不同網域之間會需要重複登入。

- 資訊交換 Information Exchange

  JWT 也是另一個安全地傳送資訊的好方法，因為 JWT 可以被簽署。舉個例子，如果使用公私鑰的加密方式簽署一個 JWT，你就可以確保請求者是誰；
  又或者，如果透過 JWT 中儲存的 header 與 payload 演算法計算其內容是否有沒有被更動過。

> 白話：JWT 可以透過演算法加密，也可以直接透過伺服器內儲存的密鑰解密以確保內容的完整性

# 觀念釐清

## JWT 與 Session 機制

- Session

  - 步驟

  1. 使用者登入
  2. 伺服器驗證成功後在伺服器端的記憶體存入 Session ID，並將此 Session ID 回傳給使用者
  3. 使用者每次請求時夾帶 Session ID，伺服器在伺服器端的記憶體中尋找此 Session ID 的紀錄
  4. 伺服器透過 Session ID 紀錄的狀態去資料庫中取出使用者資料並判斷授權

  - 缺點

  1. 不同服務架構底下（像是同組織間的不同網域、負載平衡產生的伺服器等等），伺服器的記憶體無法共享，也導致使用者的登入狀態無法被記住

- JWT

  1. 使用者登入
  2. 伺服器驗證成功後根據伺服器端中儲存的密鑰加密 JWT，並直接返回給使用者
  3. 使用者每次請求時夾帶 JWT，伺服器只驗證 JWT 的正確性
  4. 從 JWT 中取出使用者的資料並判斷授權

  - 優點

  1. 當不同服務之間透過同一組密鑰簽署 JWT，在這些服務之間都會認可該 JWT 表明的身分，也就可以做到單一登入（Single Sign On）的功能

## 驗證 Authentication 與 授權 Authorization

- 驗證 Authentication

  - 例子：使用者登入時，伺服器判斷帳號密碼正確與否的過程
  - 搭配的 HTTP Status Code 是 `401 Unauthorized`
  - 白話：你是……嗎？

- 授權 Authorization
  - 例子：使用者請求時，伺服器判斷你能不能執行請求的過程
  - 搭配的 HTTP Status Code 是 `403 Forbidden`
  - 白話：你可以做……嗎？

---

# Ref

<iframe width="560" height="315" src="https://www.youtube.com/embed/7Q17ubqLfaM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
