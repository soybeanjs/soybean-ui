import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import type { BasePaletteKey, FeedbackPaletteKey, ThemePaletteKey } from '@soybeanjs/shadcn-theme';
import { useContext } from '@soybeanjs/headless/composables';
import type { ConfigProviderProps, ThemeSize } from '@soybeanjs/ui';

export const [provideThemeContext, useTheme] = useContext('ThemeContext', () => {
  const basePalette = useStorage<BasePaletteKey>('base', 'gray');
  const themePalette = useStorage<ThemePaletteKey>('theme', 'indigo');
  const feedbackPalette = useStorage<FeedbackPaletteKey>('feedback', 'classic');
  const radius = useStorage('radius', 0.625);
  const size = useStorage<ThemeSize>('size', 'md');

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    theme: {
      presets: {
        base: basePalette.value,
        theme: themePalette.value,
        feedback: feedbackPalette.value
      },
      radius: `${radius.value}rem`
    },
    size: size.value
  }));

  const setBasePalette = (value: BasePaletteKey) => {
    basePalette.value = value;
  };
  const setThemePalette = (value: ThemePaletteKey) => {
    themePalette.value = value;
  };
  const setFeedbackPalette = (value: FeedbackPaletteKey) => {
    feedbackPalette.value = value;
  };
  const setRadius = (value: number) => {
    radius.value = value;
  };
  const setSize = (value: ThemeSize) => {
    size.value = value;
  };

  return {
    basePalette,
    themePalette,
    feedbackPalette,
    radius,
    size,
    configProviderProps,
    setBasePalette,
    setThemePalette,
    setFeedbackPalette,
    setRadius,
    setSize
  };
});
