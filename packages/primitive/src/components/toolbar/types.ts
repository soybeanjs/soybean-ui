import type { Ref } from 'vue';
import type { ClassValueProp, DataOrientation, Direction } from '../../types';
import type { PrimitiveProps } from '../primitive';
import type { ToggleGroupItemProps, ToggleGroupRootEmits, ToggleGroupRootProps } from '../toggle-group';

// Root
export interface ToolbarRootProps extends ClassValueProp {
  /** The orientation of the toolbar */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
  loop?: boolean;
}
export type ToolbarRootPropsWithPrimitive = ToolbarRootProps & PrimitiveProps;

export type ToolbarRootContext = {
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
};

// Button
export interface ToolbarButtonProps extends ClassValueProp {
  disabled?: boolean;
}
export type ToolbarButtonPropsWithPrimitive = ToolbarButtonProps & PrimitiveProps;

// Link
export interface ToolbarLinkProps extends ClassValueProp {}
export type ToolbarLinkPropsWithPrimitive = ToolbarLinkProps & PrimitiveProps;

// Separator
export interface ToolbarSeparatorProps extends ClassValueProp {}
export type ToolbarSeparatorPropsWithPrimitive = ToolbarSeparatorProps & PrimitiveProps;

// Toggle Group
export type ToolbarToggleGroupProps = ToggleGroupRootProps;
export type ToolbarToggleGroupEmits = ToggleGroupRootEmits;
export type ToolbarToggleGroupPropsWithPrimitive = ToolbarToggleGroupProps & PrimitiveProps;

// Toggle Item
export type ToolbarToggleItemProps = ToggleGroupItemProps;
export type ToolbarToggleItemPropsWithPrimitive = ToolbarToggleItemProps & PrimitiveProps;
