import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import type { BuiltinBasePresetKey, BuiltinFeedbackPresetKey, BuiltinPrimaryPresetKey } from '@soybeanjs/shadcn-theme';
import { useContext } from '@soybeanjs/headless/composables';
import type { ConfigProviderProps, ThemeSize } from '@soybeanjs/ui';

export const [provideThemeContext, useTheme] = useContext('ThemeContext', () => {
  const base = useStorage<BuiltinBasePresetKey>('base', 'gray');
  const primary = useStorage<BuiltinPrimaryPresetKey>('primary', 'indigo');
  const feedback = useStorage<BuiltinFeedbackPresetKey>('feedback', 'classic');
  const radius = useStorage('radius', 0.625);
  const size = useStorage<ThemeSize>('size', 'md');

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    theme: {
      base: base.value,
      primary: primary.value,
      feedback: feedback.value,
      radius: `${radius.value}rem`
    },
    size: size.value
  }));

  const setRadius = (value: number) => {
    radius.value = value;
  };
  const setSize = (value: ThemeSize) => {
    size.value = value;
  };

  return {
    base,
    primary,
    feedback,
    radius,
    size,
    configProviderProps,
    setRadius,
    setSize
  };
});
