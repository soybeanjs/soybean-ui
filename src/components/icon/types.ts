import type { IconProps as IconifyIconProps } from '@iconify/vue';
import type { IconValue } from '@soybeanjs/headless';

export interface IconProps extends Omit<IconifyIconProps, 'icon'> {
  icon: IconValue;
}

export type { IconValue };
