import { defineConfig } from 'ubean';

export default defineConfig({
  mode: 'ssg',
  favicon: 'https://r2.soybeanjs.tech/soybeanjs/logo-soybean-ui.svg?v=202608192144',
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en', name: 'English' },
      { code: 'zh', language: 'zh-CN', name: '中文', dir: 'ltr' }
    ],
    strategy: 'prefix_except_default'
  },
  imports: {
    // ubean 的全局 auto-import(含 i18n 的 `t`)没有排除 node_modules,
    // 会把 `import { t } from 'ubean/client'` 注入压缩产物中含 `t` 局部声明的
    // dist 模块(如 @soybeanjs/ui 的 styles/_overlay.js),导致
    // "Identifier 't' has already been declared"。本应用全部使用显式导入,
    // 直接关闭 auto-import;待上游为 AutoImport 增加 exclude 后可再开启。
    autoImport: false
  }
});
