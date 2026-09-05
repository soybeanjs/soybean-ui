import { defineConfig } from 'vite-plus';
import VueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'vue-router/unplugin';
import Unocss from 'unocss/vite';
import { registerComponentResolver } from '@ubean/build';
import { unheadVueComposablesImports } from '@unhead/vue';
import { ubeanPlugin } from 'ubean/vite';
import UiResolver from '../../packages/ui/src/resolver';
import { soybeanDocsLlmsPlugin } from './build/llms';

// S* 组件解析交给 ubean 内置 Components 实例（含 .md），注册进其共享 registry
registerComponentResolver(UiResolver());

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  css: {
    transformer: 'lightningcss'
  },
  plugins: [
    ubeanPlugin(),
    VueJsx(),
    Unocss(),
    // ubean 内置 AutoImport 仅覆盖 ubean 自身符号，vue/vue-i18n/router/unhead 仍需自有实例
    AutoImport({
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /headless[\\/]dist/, /ui[\\/]dist/],
      imports: ['vue', 'vue-i18n', VueRouterAutoImports, unheadVueComposablesImports],
      dts: 'src/typings/auto-imports.d.ts',
      vueTemplate: true
    }),
    soybeanDocsLlmsPlugin()
  ],
  ssr: {
    // Workspace packages are aliased to src via tsconfigPaths; keep them out of
    // SSR externalization so prerendering bundles the source instead of
    // resolving dist entries that may be stale or missing.
    noExternal: [
      '@soybeanjs/ui',
      '@soybeanjs/ui-x',
      '@soybeanjs/headless',
      '@soybeanjs/theme',
      'workbox-window',
      /vue-i18n/
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    open: true
  }
});
