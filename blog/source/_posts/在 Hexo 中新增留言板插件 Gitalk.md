---
title: 在 Hexo 中新增留言板插件 Gitalk
abbrlink: 51727
date: 2021-06-28 01:45:35
tags:
  - Hexo
  - Gitalk
---

# 前言

## 什麼是 Gitalk？

[Gitalk](https://github.com/gitalk/gitalk) 是一套把 Github Issues 當作資料庫的留言板插件，並以輕量版的 React - Preact 為基底開發。

## 這文章要幹嘛？

由於 Hexo 是生成靜態檔案，把 Gitalk 的留言功能整合進你的 Hexo 部落格系統可以完美解決 Hexo 生成的靜態網頁沒有資料庫所以無法實作留言板功能的缺憾。

---

# 前置作業

- （必須）[申請](https://github.com/settings/applications/new) Github OAuth 金鑰，並記下 ID 與 Secret。
- 可能需要使用跟我一樣的 Hexo 主題 [Chic](https://github.com/Siricee/hexo-theme-Chic)，或者要略懂目前使用主題的模板架構。

---

# 步驟

**_以下步驟都以 Chic 主題為例_**

## 1. 在主題資料夾中，找到元件資料夾，並新增檔案 gitalk.ejs

> Chic/layout/\_partial

## 2. 在 gitalk.ejs 檔案中引入 gitalk 並寫好 HTML

> Chic/layout/\_partial/gitalk.ejs

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css" />
<style>
  .post-gitalk {
    margin-top: 5rem;
  }
</style>
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>

<section class="post-gitalk">
  <div id="gitalk-container"></div>
</section>

<script>
  const gitalk = new Gitalk({
    clientID: '29fa6a73372198e453e1',
    clientSecret: '4c24b3860a15d4685af93c57896e463fdb329ba7',
    repo: 'DahisC.github.io', // The repository of store comments,
    owner: 'DahisC',
    admin: ['DahisC'],
    id: location.pathname, // Ensure uniqueness and length less than 50
    distractionFreeMode: false, // Facebook-like distraction free mode
    language: 'en',
  });

  gitalk.render('gitalk-container');
</script>
```

## 3. 在文章模板中引入剛剛寫好的插件

> Chic/layout/\_page/post.ejs

```html
<div>
  <article>
    <section class="post-nav">
      <% if(post.prev){ %>
      <a class="prev" rel="prev" href="<%- url_for(post.prev.path)%>"><%- post.prev.title%></a>
      <% } %> <% if(post.next){ %>
      <a class="next" rel="next" href="<%- url_for(post.next.path)%>"><%- post.next.title%></a>
      <% } %>
    </section>
    <!-- 引入插件 -->
    <%- partial('_partial/gitalk') %>
  </article>
</div>
```

## 4. 在開發伺服器中確認並部署至 Github

成功之後重開 Hexo 的開發伺服器，應該會在剛剛引入的位置看見留言板，但尚未初始化；
確認出現後請將部落格重新部署至 Github。

![](check-in-dev-server.png)

## 5. 在正式的部落格環境中授權

按下剛剛開發環境中出現的按鈕，並允許 gitalk 存取你指定的 Github 儲藏庫。

## 6. 完成

![](done.png)

---

# tl;dr

想出這方法的人真天才，免費仔的極致 XDDD

新增的文章都會在 Github 中新增一個對應的 Issue，然後把留言存在裡面

很棒！！！

![](tldr-1.png)
![](tldr-2.png)
