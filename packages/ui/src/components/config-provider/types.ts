import type { ConfigProviderProps as _ConfigProviderProps } from '@soybeanjs/headless/config-provider';
import type { ProgressProviderProps } from '@soybeanjs/headless/progress';
import type { PropsToContext } from '@soybeanjs/headless/types';
import type { ThemeOptions } from '@soybeanjs/shadcn-theme';
import type { ThemeSize } from '@/theme';
import type { ToastProviderProps } from '../toast/types';

export interface IconifyOptions {
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
}

/**
 * Properties for the ConfigProvider component.
 */
export interface ConfigProviderProps extends _ConfigProviderProps {
  /** The theme options. */
  theme?: ThemeOptions;
  /**
   * The size options.
   *
   * @deprecated Use `theme.size` instead.
   */
  size?: ThemeSize;
  /** The iconify options. */
  iconify?: IconifyOptions;
  /** The global top progress configuration of your application. */
  progress?: Partial<ProgressProviderProps>;
  /** The global toast configuration of your application. This will be inherited by the related components. */
  toast?: Partial<ToastProviderProps>;
  /**
   * Whether to use custom toast rendering. If set to `true`, the `ToastProvider` will not render the default toast UI, and you can import `ToastProvider` component to render custom toast UI.
   *
   * @default false
   */
  customToast?: boolean;
}

/**
 * Context for the ConfigProvider component.
 */
export interface ConfigProviderContext
  extends PropsToContext<Omit<ConfigProviderProps, 'iconRender'>>, Pick<ConfigProviderProps, 'iconRender'> {}

export type { ThemeOptions };
