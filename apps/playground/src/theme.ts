import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useContext } from '@soybeanjs/headless/composables';
import type { ConfigProviderProps, Direction } from '@soybeanjs/ui';

/**
 * 页面级配置上下文：dir / locale。
 *
 * 主题状态（base / primary / radius / size / mode）与自定义 preset 已收敛到
 * 库内 `SConfigProvider`（见 `@soybeanjs/ui` 的 `useTheme`），由 `persistTheme`
 * 负责 localStorage + cookie 持久化。这里只保留不属于主题的国际化状态
 * （dir / locale），并产出传给 `SConfigProvider` 的 props。
 */
export const [provideThemeContext, useTheme] = useContext('UiPageContext', () => {
  const direction = useStorage<Direction>('direction', 'ltr');
  const locale = useStorage('locale', 'en');

  const setDirection = (value: Direction) => {
    direction.value = value;
  };

  const setLocale = (value: string) => {
    locale.value = value;
  };

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    dir: direction.value,
    locale: locale.value,
    // 主题状态由库内 SConfigProvider 统一持久化（localStorage + cookie）
    persistTheme: true
  }));

  return {
    direction,
    locale,
    setDirection,
    setLocale,
    configProviderProps
  };
});