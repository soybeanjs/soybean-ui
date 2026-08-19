import type { ComputedRef } from 'vue';
import type { BaseProps, Direction, UiClass } from '../../types';

/**
 * The layout of each descriptions item.
 */
export type DescriptionsLayout = 'horizontal' | 'vertical';

/**
 * The alignment of the label cell.
 */
export type DescriptionsLabelAlign = 'start' | 'center' | 'end';

/**
 * Properties for the DescriptionsRoot component.
 */
export interface DescriptionsRootProps extends BaseProps {
  /**
   * The number of items displayed per row.
   *
   * @default 3
   */
  column?: number;
  /**
   * Whether to render bordered cells.
   */
  bordered?: boolean;
  /**
   * The layout of each item.
   *
   * @default 'horizontal'
   */
  layout?: DescriptionsLayout;
  /**
   * The alignment of the label cell.
   *
   * @default 'start'
   */
  labelAlign?: DescriptionsLabelAlign;
  /**
   * The reading direction of the descriptions.
   */
  dir?: Direction;
}

/**
 * Properties for the DescriptionsItem component.
 */
export interface DescriptionsItemProps extends BaseProps {
  /**
   * The label text of the item.
   */
  label?: string;
  /**
   * The number of columns the item occupies.
   *
   * @default 1
   */
  span?: number;
}

/**
 * Context for the DescriptionsRoot component.
 */
export interface DescriptionsRootContext {
  /** The layout of each item. */
  layout: ComputedRef<DescriptionsLayout>;
  /** The alignment of the label cell. */
  labelAlign: ComputedRef<DescriptionsLabelAlign>;
  /** The reading direction. */
  dir: ComputedRef<Direction>;
}

/**
 * Available UI slots for the Descriptions component.
 */
export type DescriptionsUiSlot = 'root' | 'item' | 'label' | 'content';

/**
 * UI class overrides for the Descriptions component.
 */
export type DescriptionsUi = UiClass<DescriptionsUiSlot>;
