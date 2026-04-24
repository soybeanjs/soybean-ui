import type { VNode } from 'vue';
import type { Direction, PropsToContext } from '../../types';
import type { TooltipProviderProps } from '../tooltip/types';
import type { IconValue } from '../_icon/types';

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
  /**
   * A function to render the icon. This is useful when you want to use a custom icon library or want to wrap the icon with a custom component.
   *
   * @param icon The icon to be rendered. It can be a string, a VNode, or a Component.
   */
  iconRender?: (icon: IconValue) => VNode;
}

export interface ConfigProviderContext
  extends PropsToContext<Omit<ConfigProviderProps, 'iconRender'>>, Pick<ConfigProviderProps, 'iconRender'> {}
