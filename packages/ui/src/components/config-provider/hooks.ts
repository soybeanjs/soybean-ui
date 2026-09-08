import { computed, defineComponent, h, onMounted, onUnmounted, shallowRef, watch } from 'vue';
import { createTheme } from '@soybeanjs/theme';
import { THEME_INIT_STYLE_ID } from '@soybeanjs/theme/ssr';
import { setStoredThemeCss, THEME_PRESETS_STORAGE_KEY, THEME_STORAGE_KEY } from '@soybeanjs/theme/storage';
import type { ThemeConfigState } from '@soybeanjs/theme/storage';
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
    const styleRef = shallowRef<HTMLStyleElement | null>(null);

    onMounted(() => {
      // Hydration does not re-apply `innerHTML` to an existing node, so the
      // SSR-rendered style keeps the server's default theme. Re-apply the
      // reactive CSS here so a persisted (localStorage) theme survives refresh.
      if (styleRef.value) {
        styleRef.value.textContent = styleProps.css;
      }

      // 首帧内联脚本注入的样式带 `!important`，会压制运行时主题切换；
      // 此时响应式 CSS 已写入，可安全移除。
      document.getElementById(THEME_INIT_STYLE_ID)?.remove();
    });

    return () =>
      h('style', {
        ref: styleRef,
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

  // 持久化生成好的 CSS 快照：首帧内联脚本（createThemeInitScript 的 injectCss）
  // 读取它，在 hydration 前应用派生 token，消除刷新时的主题闪烁。
  watch(themeCss, css => {
    if (props.persistTheme) {
      setStoredThemeCss(css);
    }
  });

  // 跨标签页同步：storage 事件（其他标签页写入）使缓存失效并触发重读。
  // 主题配置走 `refreshThemeConfig`（重读 + 强制重派生）；自定义 preset 表走
  // `refreshPresetsSnapshot`。仅当 `persistTheme` 开启时才注册监听。
  const handleStorage = (event: StorageEvent): void => {
    if (event.key === THEME_STORAGE_KEY) {
      themeContext.refreshThemeConfig();
    } else if (event.key === THEME_PRESETS_STORAGE_KEY) {
      themeContext.refreshPresetsSnapshot?.();
    }
  };

  onMounted(() => {
    if (!props.persistTheme) {
      return;
    }

    window.addEventListener('storage', handleStorage);

    // 首次访问（或升级前没有快照）时补写一次，保证下次刷新可以首帧应用。
    setStoredThemeCss(themeCss.value);
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
