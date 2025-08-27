import { defineConfig } from 'vitepress';
import UnoCSS from 'unocss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [UnoCSS()],
  },
  srcDir: './src',
  title: 'Terry Cheng 的技術筆記',

  description: '懶惰、沒耐心和傲慢',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,
    logo: '/logo.png',

    socialLinks: [{ icon: 'github', link: 'https://github.com/DahisC' }],

    sidebar: [
      {
        text: '作品集',
        collapsed: true,
        items: [
          {
            text: '總覽',
            link: '',
          },
          {
            text: 'Space tourism 形象網站切版練習',
            link: '/articles/portfolios/space-tourism',
          },
          {
            text: '# 肯德基優惠券網站',
            link: '/articles/portfolios/kfc-coupons-website',
          },
        ],
      },
      {
        text: '技術筆記',
        collapsed: false,
        items: [
          {
            text: '# popover 屬性',
            link: '',
          },
          {
            text: '實作 Vue Dialog/Modal 元件',
            link: '/articles/tech/custom-dialog-component/index',
          },
          {
            text: '# Nuxt 4 與上一版的比較',
            link: '/articles/tech/threejs-memos',
          },
          {
            text: '# Three.js 學習筆記',
            link: '/articles/tech/threejs-memos',
          },
          {
            text: '# Vue 自訂表單元件與驗證',
            link: '/articles/tech/custom-component-with-vee-validate/index',
          },
          {
            text: 'Vue 的各種雙向綁定',
            link: '/articles/tech/about-vue-two-way-bindings',
          },
          { text: '在 VitePress 中新增表情符號系統', link: '/articles/tech/add-emoji-to-vitepress' },
        ],
      },
      {
        text: '雜記',
        collapsed: true,
        items: [
          {
            text: 'Kazu 的語言學習技巧',
            link: '/articles/memos/kazu-learning-language',
          },
        ],
      },
      // {
      //   text: '流水帳',
      //   collapsed: true,
      //   items: [
      //     {
      //       text: '2024 關西',
      //       collapsed: true,
      //       items: [
      //         { text: '2024 關西之旅 Day 1', link: '/articles/diary/20241028' },
      //         { text: '2024 關西之旅 Day 2', link: '/articles/diary/20241029' },
      //       ],
      //     },
      //   ],
      // },

      {
        text: '其它',
        collapsed: true,
        items: [
          { text: '值得一用的技術', link: '/articles/others/memos' },
          { text: '書單', link: '/articles/others/books' },
          { text: '表情符號', link: '/articles/others/emojis' },
          { text: '常用連結', link: '/articles/others/links' },
        ],
      },
    ],
  },
  markdown: {
    config: (md) => {
      md.renderer.rules.text = (tokens, idx) => {
        let text = tokens[idx].content;

        // 偵測 `%...%` 內的內容
        text = text.replace(/%([a-zA-Z0-9_]+)%/g, (_, name) => {
          return `<Emoji name="${name}" />`;
        });

        return text;
      };
    },
  },
});
