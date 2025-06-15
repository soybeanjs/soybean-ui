import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { useContext } from '@headless/composables';
import type { ConfigProviderProps, ThemeSize } from '@ui';

export const [provideThemeContext, useTheme] = useContext('ThemeContext', () => {
  const color = useStorage<ThemeConfigColor>('color', 'default');
  const radius = useStorage('radius', 0.5);
  const size = useStorage<ThemeSize>('size', 'md');

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    theme: {
      color: color.value,
      radius: radius.value
    },
    size: size.value
  }));

  return {
    color,
    radius,
    size,
    configProviderProps
  };
});
