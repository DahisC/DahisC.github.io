import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './src',
  title: 'Dahisney',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '網誌', link: '/' }],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: '文章',
        items: [{ text: '在 VitePress 中新增表符吧', link: '/articles/add-emoji-to-vitepress' }],
      },
      {
        text: '日誌',
        collapsed: true,
        items: [
          {
            text: '2024 關西',
            collapsed: true,
            items: [
              { text: '2024 關西之旅 Day 1', link: '/articles/diary/20241028' },
              { text: '2024 關西之旅 Day 2', link: '/articles/diary/20241029' },
            ],
          },
          // {
          //   text: '雜記',
          //   collapsed: true,
          //   items: [
          //     {
          //       text: '電影',
          //       items: [{ text: '喵的奇幻漂流', link: '/articles/diary/20250224' }],
          //     },
          //   ],
          // },
        ],
      },
      {
        text: '沒有重要到需要開一個分類',
        items: [
          { text: '值得一用的技術', link: '/articles/others/memos' },
          { text: '書單', link: '/articles/others/books' },
          { text: '表情符號', link: '/articles/others/emojis' },
          { text: '常用連結', link: '/articles/others/links' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
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
