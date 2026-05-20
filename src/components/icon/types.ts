import type { IconValue } from '@soybeanjs/headless';
import type { IconProps as IconifyIconProps } from '@iconify/vue';

/**
 * Properties for the Icon component.
 */
export interface IconProps extends Omit<IconifyIconProps, 'icon'> {
  /**
   * Icon rendered by the component.
   */
  icon: IconValue;
}

export type { IconValue };
