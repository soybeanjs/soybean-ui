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
  }
});
