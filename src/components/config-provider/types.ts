import type { PropsToContext, ConfigProviderProps as _ConfigProviderProps } from '@soybeanjs/headless';
import type { ThemeOptions } from '@soybeanjs/shadcn-theme';
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
     * @defaultValue '1.25em'
     */
    width?: string;
    /**
     * The default height of the icon.
     *
     * @defaultValue '1.25em'
     */
    height?: string;
    /**
     * Prefix for local icons
     *
     * format: "prefix:iconName"
     */
    localPrefix?: string;
  };
  toast?: ToastProviderProps;
}

export interface ConfigProviderContextParams extends PropsToContext<ConfigProviderProps> {}

export type { ThemeOptions };
