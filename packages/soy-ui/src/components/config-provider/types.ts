import type { Ref } from 'vue';
import type { ConfigProviderProps as _ConfigProviderProps } from '@soybean-ui/primitives';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ThemeOptions } from '@soybean-ui/unocss-preset';

export interface ConfigProviderProps extends _ConfigProviderProps {
  /** The theme options. */
  theme?: ThemeOptions;
  /** The size options. */
  size?: ThemeSize;
}

export interface ConfigProviderContext {
  theme: Ref<ThemeOptions | undefined>;
  size: Ref<ThemeSize | undefined>;
}
