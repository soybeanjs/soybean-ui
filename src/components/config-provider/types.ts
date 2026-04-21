import type { PropsToContext, ConfigProviderProps as _ConfigProviderProps } from '@soybeanjs/headless';
import type { ThemeOptions } from '@soybeanjs/shadcn-theme';
import type { ThemeSize } from '@/theme';
import type { ProgressProviderProps } from '../progress/types';
import type { ToasterProps } from '../toast/types';

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
  };
  /** The global top progress configuration of your application. */
  progress?: Partial<ProgressProviderProps>;
  /** The global toast configuration of your application. This will be inherited by the related components. */
  toast?: Partial<ToasterProps>;
  /**
   * Whether to use custom toast rendering. If set to `true`, the `Toaster` will not render the default toast UI, and you can import `Toaster` component to render custom toast UI.
   *
   * [是否使用自定义吐司渲染。如果设置为 `true`，`Toaster` 将不会渲染默认的吐司 UI，你可以导入 `Toaster` 组件来渲染自定义的吐司 UI。]
   *
   * @default false
   * @type boolean
   */
  customToast?: boolean;
}

export interface ConfigProviderContext
  extends PropsToContext<Omit<ConfigProviderProps, 'iconRender'>>, Pick<ConfigProviderProps, 'iconRender'> {}

export type { ThemeOptions };
