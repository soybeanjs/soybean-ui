import type { IconProps as IconifyIconProps } from '@iconify/vue';
import type { IconValue } from '@soybeanjs/headless/_icon';

/**
 * Props for the icon component.
 */
export interface IconProps extends Omit<IconifyIconProps, 'icon'> {
  /**
   * Icon rendered by the component.
   */
  icon: IconValue;
}

export type { IconValue };
