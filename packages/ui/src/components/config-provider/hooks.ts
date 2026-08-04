import { computed, defineComponent, h, onMounted, onUnmounted } from 'vue';
import { createTheme } from '@soybeanjs/theme';
import type { ThemeConfigState } from '@soybeanjs/theme';
import { THEME_PRESETS_STORAGE_KEY } from '@soybeanjs/theme/storage';
import type { ConfigProviderProps } from './types';
import { createThemeContext, provideThemeContext } from './use-theme';

/**
 * Renders the theme `<style>` element. It is produced by a render function
 * because the SFC template compiler removes `<script>` / `<style>` tags from
 * component templates (they are treated as side-effect tags).
 */
const ThemeStyle = defineComponent({
  name: 'SoybeanUIThemeStyle',
  inheritAttrs: false,
  props: {
    css: { type: String, required: true },
    nonce: { type: String, default: undefined }
  },
  setup(styleProps) {
    return () =>
      h('style', {
        id: '__SoybeanUI_theme',
        innerHTML: styleProps.css,
        nonce: styleProps.nonce
      });
  }
});

/**
 * Owns all theme-related logic for the ConfigProvider: the reactive theme
 * context (created via `createThemeContext`), the derived theme CSS, and the
 * cross-tab storage refresh. Keeps the component SFC thin and the theme
 * concerns co-located with a single composable.
 */
export function useConfigProviderTheme(props: ConfigProviderProps) {
  // 响应式主题上下文：状态 / 持久化 / SSR / preset 全部收敛到 use-theme.ts，
  // 并通过 `provideThemeContext` 暴露给后代组件（`useTheme()`）。
  const themeContext = createThemeContext(props);
  provideThemeContext(themeContext);

  /**
   * theme CSS is rendered inline so it exists in the SSR HTML. The `useStyleTag`
   * approach is client-only and leaves SSR output without any theme variables.
   * The element is rendered on both server and client so hydration stays
   * consistent; reactivity keeps the content in sync when the theme changes.
   */
  const themeCss = computed(() => createTheme(themeContext.theme.value));

  // 跨标签页同步：storage 事件（其他标签页写入）使缓存失效并触发重读。
  // 主题配置走 `refreshThemeConfig`（重读 + 强制重派生）；自定义 preset 表走
  // `refreshPresetsSnapshot`。仅当 `persistTheme` 且 `cacheThemeConfig` 开启时
  // 才注册监听（cacheThemeConfig=false 表示不缓存，也不监听 storage 失效）。
  const handleStorage = (event: StorageEvent): void => {
    if (event.key === props.themeStorageKey) {
      themeContext.refreshThemeConfig();
    } else if (event.key === THEME_PRESETS_STORAGE_KEY) {
      themeContext.refreshPresetsSnapshot?.();
    }
  };

  onMounted(() => {
    if (props.persistTheme && props.cacheThemeConfig) {
      window.addEventListener('storage', handleStorage);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorage);
  });

  /**
   * 写回持久化主题配置并同步内存状态，使下游主题派生无需重读存储。
   * 通过 `defineExpose` 暴露给应用层。
   */
  const commitThemeConfig = (config: ThemeConfigState): void => {
    themeContext.setThemeState(config);
  };

  return { themeCss, ThemeStyle, commitThemeConfig };
}
