---
outline: deep
---

# Vue 與資安攻擊

[官方文件](https://vuejs.org/guide/best-practices/security)

這篇討論一下常見的資安攻擊跟 Vue 提供的預設迴避方式，以及尋找可行的解決方案

::: tip
Nuxt 可以使用 [Nuxt Security](https://nuxt.com/modules/security) 模組以強化防禦手段 %138%
:::

## XSS

### 解釋
XSS 的原意為 Cross-Site Scripting / 跨站腳本攻擊

指的是前端接收了來自外部的原始碼，並且在網站上執行的情況

在官方的文件也有提到這段文字：The most fundamental security rule when using Vue is never use non-trusted content as your component template.

由此可見完全接收未過濾的內容並且使用在樣板語法上是非常危險的 %127%


#### HTML Injection

##### 模板



##### HTML Injection - 元素屬性

元素屬性的攻擊方式為透過多傳入一個雙引號 `"` 關閉原本的屬性

假設原本有一段這樣的程式碼（這邊簡化了原生瀏覽器實作的方式，實際上會用 `innerHTML` 插入 `userProvidedString`

```html
<h1 title="userProvidedString">hello</h1>
```

但如果 `userProvidedString` 傳入的是 `" onerror="alert('XSS')"`（注意開頭的 `"`）
則這段內容對瀏覽器來說可能會被渲染為

```html
<h1 title="" onerror="alert('XSS')">hello</h1>
```

##### URL Injection
*整理中*

##### Style Injection
*整理中*

### Vue 做了什麼

#### 模板語法

透過模板語法 `{{ template }}` 或是渲染函式 `h()`，特殊符號像是 `<` 與 `>` 會自動被轉義

  - 會被轉義為 [HTML Entitie Name](https://www.w3schools.com/html/html_entities.asp) 的 `&lt;` 與 `&gt;`
  - 以瀏覽器原生的 `textContent` API 實現，所以除非瀏覽器本身有漏洞才會出問題
	- 延伸：`innerHTML` 不會處理轉義，但 `textContent` 則會
- 如果是元素事件的話，也會自動轉義

#### 元素屬性

同樣的，透過動態綁定屬性 `:` 也會自動轉義這些特殊字元

  - 以瀏覽器原生的 API `setAttribute` 之類的方式達成，所以除非瀏覽器本身有漏洞才會出問題

### 結論與解決方案

::: danger
`innerHTML` 是個很危險的語法，以 Vue 來說對應的就是 `v-html`
:::

#### DOMPurify
如果真的沒辦法避免使用 `innerHTML` 這類語法的話，可以考慮引入 [DOMPurify](https://github.com/cure53/DOMPurify)

DOMPurify 可以自動過濾一段 HTML 中不安全的程式碼，也支援手動配置


#### iframe
如果真的逼不得已需要執行類似 `innerHTML` 的插入語法，可以使用 `iframe` 搭配 `sandbox` 屬性隔離腳本執行環境

### CSP
[Content Security Policy / 內容安全政策](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)，指的是伺服器在回傳網頁時透過在 Header 加入相關的限制，以提示網站應該如何載入內容

*整理中*