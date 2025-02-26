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
        text: '技術',
        items: [{ text: '在 VitePress 中新增表符吧', link: '/articles/tech/add-emoji-to-vitepress' }],
      },
      {
        text: '雜記',
        collapsed: true,
        items: [
          {
            text: 'Kazu 的語言學習技巧',
            link: '/articles/memos/kazu-learning-language',
          },
          {
            text: '喵的奇幻漂流',
            link: '/articles/memos/flow',
          },
        ],
      },
      {
        text: '流水帳',
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
        ],
      },

      {
        text: '不知道取什麼',
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
