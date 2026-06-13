import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useContext } from '@soybeanjs/headless/composables';
import type {
  BuiltinBasePresetKey,
  BuiltinFeedbackPresetKey,
  BuiltinPrimaryPresetKey,
  ThemeRadius
} from '@soybeanjs/shadcn-theme';
import type { ConfigProviderProps, ThemeSize, Direction } from '@soybeanjs/ui';

export const [provideThemeContext, useTheme] = useContext('ThemeContext', () => {
  const base = useStorage<BuiltinBasePresetKey>('base', 'zinc');
  const primary = useStorage<BuiltinPrimaryPresetKey>('primary', 'indigo');
  const feedback = useStorage<BuiltinFeedbackPresetKey>('feedback', 'classic');
  const radius = useStorage<ThemeRadius>('radius', 'md');
  const size = useStorage<ThemeSize>('size', 'md');
  const direction = useStorage<Direction>('direction', 'ltr');
  const locale = useStorage('locale', 'en');

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    theme: {
      size: size.value,
      base: base.value,
      primary: primary.value,
      feedback: feedback.value,
      radius: radius.value
    },
    dir: direction.value,
    locale: locale.value
  }));

  const setRadius = (value: ThemeRadius) => {
    radius.value = value;
  };
  const setSize = (value: ThemeSize) => {
    size.value = value;
  };
  const setDirection = (value: Direction) => {
    direction.value = value;
  };

  const setLocale = (value: string) => {
    locale.value = value;
  };

  return {
    base,
    primary,
    feedback,
    radius,
    size,
    direction,
    locale,
    configProviderProps,
    setRadius,
    setSize,
    setDirection,
    setLocale
  };
});
