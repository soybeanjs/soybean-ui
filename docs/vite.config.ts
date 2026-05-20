import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import MetaLayouts from 'vite-plugin-vue-meta-layouts';
import generateSitemap from 'vite-ssg-sitemap';
import Components from 'unplugin-vue-components/vite';
import Markdown from 'unplugin-vue-markdown/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'vue-router/unplugin';
import VueRouter from 'vue-router/vite';
import Unocss from 'unocss/vite';
import UiResolver from '@soybeanjs/ui/resolver';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import Shiki from '@shikijs/markdown-exit';
import { unheadVueComposablesImports } from '@unhead/vue';
import { customMarkdownPlugin } from './src/modules/markdown';
import { soybeanDocsLlmsPlugin } from './build/llms';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  css: {
    transformer: 'lightningcss'
  },
  plugins: [
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typings/typed-router.d.ts'
    }),
    MetaLayouts(),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    VueJsx(),
    Unocss(),
    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /headless[\\/]dist/],
      imports: [
        'vue',
        'vue-i18n',
        VueRouterAutoImports,
        unheadVueComposablesImports,
        {
          'vue-router/auto': ['useLink']
        }
      ],
      dts: 'src/typings/auto-imports.d.ts',
      vueTemplate: true
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/typings/components.d.ts',
      resolvers: [UiResolver()]
    }),
    Markdown({
      wrapperClasses: 'markdown-wrapper',
      headEnabled: true,
      async markdownItSetup(md) {
        md.use(
          Shiki({
            defaultColor: false,
            themes: {
              light: 'one-light',
              dark: 'one-dark-pro'
            }
          })
        );
        md.use(customMarkdownPlugin);
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')]
    }),
    soybeanDocsLlmsPlugin()
  ],
  ssgOptions: {
    script: 'sync',
    formatting: 'minify',
    beastiesOptions: {
      reduceInlineStyles: false
    },
    onFinished() {
      generateSitemap();
    }
  },
  ssr: {
    noExternal: ['workbox-window', /vue-i18n/]
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    open: true
  }
});
