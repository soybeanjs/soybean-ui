import path from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Layouts from 'vite-plugin-vue-layouts';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import UiResolver from '@soybeanjs/ui/resolver';
import { unheadVueComposablesImports } from '@unhead/vue';
import VueRouter from 'unplugin-vue-router/vite';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import LinkAttributes from 'markdown-it-link-attributes';
import Markdown from 'unplugin-vue-markdown/vite';
import Shiki from '@shikijs/markdown-it';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import generateSitemap from 'vite-ssg-sitemap';
import { loadPlaygroundModules } from './src/modules/playground';

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@playground/': `${path.resolve(__dirname, '../playground')}/`
    }
  },
  plugins: [
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typings/typed-router.d.ts'
    }),
    Layouts(),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    VueJsx(),
    Unocss(),
    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue-i18n',
        unheadVueComposablesImports,
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink']
        }
      ],
      dts: 'src/typings/auto-imports.d.ts',
      dirs: [],
      vueTemplate: true
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/typings/components.d.ts',
      resolvers: [UiResolver()]
    }),
    Markdown({
      wrapperClasses: 'prose-slate dark:prose-slate-invert md:max-w-80ch! m-auto text-left',
      headEnabled: true,
      async markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        });
        md.use(
          await Shiki({
            defaultColor: false,
            themes: {
              light: 'one-light',
              dark: 'one-dark-pro'
            }
          })
        );
        loadPlaygroundModules(md);
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')]
    })
  ],
  ssgOptions: {
    script: 'async',
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
