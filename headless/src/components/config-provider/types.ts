import type { VNode } from 'vue';
import type { LocaleMessagesOverrides } from '../../locale/types';
import type { Direction, PropsToContext } from '../../types';
import type { IconValue } from '../_icon/types';
import type { TooltipProviderProps } from '../tooltip/types';

/**
 * Properties for the ConfigProvider component.
 */
export interface ConfigProviderProps {
  /**
   * The global reading direction of your application. This will be inherited by all components.
   *
   * When omitted, the direction follows the current locale and falls back to `'ltr'`.
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
  /**
   * Overrides for built-in component locale messages. Merged on top of the locale selected by the
   * `locale` prop, so you only need to supply the keys you want to change.
   *
   * @type LocaleMessagesOverrides
   */
  messages?: LocaleMessagesOverrides;
}

/**
 * Context for the ConfigProvider component.
 */
export interface ConfigProviderContext
  extends PropsToContext<Omit<ConfigProviderProps, 'iconRender'>>, Pick<ConfigProviderProps, 'iconRender'> {}
