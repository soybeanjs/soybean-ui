import type { PropsToContext, ConfigProviderProps as _ConfigProviderProps } from '@headless';

export interface ConfigProviderProps extends _ConfigProviderProps {
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
}

export interface ConfigProviderContextParams extends PropsToContext<ConfigProviderProps> {}
