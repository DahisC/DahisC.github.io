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
        text: '一些紀錄',
        items: [{ text: '書單', link: '/articles/others/books' }],
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
