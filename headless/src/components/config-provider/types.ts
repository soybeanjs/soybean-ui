import type { Direction, PropsToContext, ScrollBodyOption } from '../../types';
import type { TooltipProviderProps } from '../tooltip/types';

export interface ConfigProviderProps {
  /**
   * The global reading direction of your application. This will be inherited by all components.
   *
   * @defaultValue 'ltr'
   */
  dir?: Direction;
  /**
   * The global locale of your application. This will be inherited by all components.
   *
   * @defaultValue 'en'
   */
  locale?: string;
  /**
   * The global scroll body behavior of your application. This will be inherited by the related components.
   *
   * @type boolean
   *
   *   | ScrollBodyOption
   */
  scrollBody?: boolean | ScrollBodyOption;
  /**
   * The global `nonce` value of your application. This will be inherited by the related components.
   *
   * @type string
   */
  nonce?: string;
  /**
   * The global tooltip configuration of your application. This will be inherited by the related components.
   *
   * @type TooltipProviderProps
   */
  tooltip?: Partial<TooltipProviderProps>;
  /**
   * Whether the application is running in Nuxt.
   *
   * @type boolean
   */
  nuxt?: boolean;
}

export interface ConfigProviderContextParams extends PropsToContext<ConfigProviderProps> {}
