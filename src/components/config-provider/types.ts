import type { PropsToContext, ConfigProviderProps as _ConfigProviderProps } from '@soybeanjs/headless';
import type { ThemeOptions } from '@soybeanjs/unocss-shadcn';
import type { ThemeSize } from '@/theme';
import type { ToastProviderProps } from '../toast/types';

export interface ConfigProviderProps extends _ConfigProviderProps {
  /** The theme options. */
  theme?: ThemeOptions;
  /** The size options. */
  size?: ThemeSize;
  /** The iconify options. */
  iconify?: {
    /**
     * The default width of the icon.
     *
     * @defaultValue '1.2em'
     */
    width?: string;
    /**
     * The default height of the icon.
     *
     * @defaultValue '1.2em'
     */
    height?: string;
  };
  toast?: ToastProviderProps;
}

export interface ConfigProviderContextParams extends PropsToContext<ConfigProviderProps> {}
