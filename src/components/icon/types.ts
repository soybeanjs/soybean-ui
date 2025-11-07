import type { Component, VNode } from 'vue';
import type { IconifyIcon, IconProps as IconifyIconProps } from '@iconify/vue';

export type IconValue = VNode | Component | string | IconifyIcon;

export interface IconProps extends Omit<IconifyIconProps, 'icon'> {
  icon: IconValue;
}
