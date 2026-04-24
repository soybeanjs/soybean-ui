import type { Component, VNode } from 'vue';

export type IconValue = VNode | Component | string | null | undefined;

export interface IconProps {
  icon: IconValue;
}
