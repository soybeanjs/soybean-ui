import type {
  DescriptionsUiSlot,
  DescriptionsRootProps as _DescriptionsRootProps,
  DescriptionsItemProps as _DescriptionsItemProps
} from '@soybeanjs/headless/descriptions';
import type { ClassValue, UiClass } from '@soybeanjs/headless/types';

/**
 * UI slots added by the styled layer on top of the headless slots.
 */
export type DescriptionsExtraUiSlot = 'title';

/**
 * UI class overrides including styled-layer structural slots.
 */
export type DescriptionsExtendedUi = UiClass<DescriptionsUiSlot | DescriptionsExtraUiSlot>;

/**
 * Properties for the Descriptions component.
 */
export interface DescriptionsProps extends _DescriptionsRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Title text rendered above the list.
   */
  title?: string;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<DescriptionsExtendedUi>;
}

/**
 * Properties for the DescriptionsItem component.
 */
export interface DescriptionsItemProps extends _DescriptionsItemProps {}
