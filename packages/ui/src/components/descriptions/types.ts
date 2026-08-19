import type {
  DescriptionsUi,
  DescriptionsRootProps as _DescriptionsRootProps,
  DescriptionsItemProps as _DescriptionsItemProps
} from '@soybeanjs/headless/descriptions';
import type { ClassValue } from '@soybeanjs/headless/types';

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
  ui?: Partial<DescriptionsUi>;
}

/**
 * Properties for the DescriptionsItem component.
 */
export interface DescriptionsItemProps extends _DescriptionsItemProps {}
