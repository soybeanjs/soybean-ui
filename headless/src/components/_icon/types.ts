import type { Component, VNode } from 'vue';

/**
 * Type information for the icon value component.
 */
export type IconValue = VNode | Component | string | null | undefined;

/**
 * Properties for the icon component.
 */
export interface IconProps {
  /**
   * Icon rendered by the component.
   */
  icon: IconValue;
}
