import type { ComputedRef, HTMLAttributes } from 'vue';
import type { DataOrientation, DefinedValue, Direction, UiClass } from '../../types';
import type {
  ToggleGroupItemProps as BaseToggleGroupItemProps,
  ToggleGroupRootEmits as BaseToggleGroupRootEmits,
  ToggleGroupRootProps as BaseToggleGroupRootProps
} from '../toggle-group/types';
import type { ButtonEmits, ButtonProps } from '../button/types';
import type { LinkProps } from '../link/types';
import type { SeparatorRootProps } from '../separator/types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the toolbar root component.
 */
export interface ToolbarRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The orientation of the toolbar. */
  orientation?: DataOrientation;
  /** The reading direction of the toolbar. */
  dir?: Direction;
  /** Whether keyboard roving focus loops. */
  loop?: boolean;
}

/**
 * Context for the toolbar root component.
 */
export interface ToolbarRootContext {
  /**
   * Orientation of the component.
   */
  orientation: ComputedRef<DataOrientation>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
}

/**
 * Parameters used to create the toolbar root context.
 */
export interface ToolbarRootContextParams {
  /**
   * Orientation of the component.
   */
  orientation: ComputedRef<DataOrientation>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction | undefined>;
}

/**
 * Available UI slots for the toolbar component.
 */
export type ToolbarUiSlot = 'root' | 'button' | 'link' | 'separator' | 'toggleGroup' | 'toggleItem';

/**
 * UI class overrides for the toolbar component.
 */
export type ToolbarUi = UiClass<ToolbarUiSlot>;

/**
 * Properties for the toolbar button component.
 */
export interface ToolbarButtonProps extends ButtonProps {}

/**
 * Events for the toolbar button component.
 */
export type ToolbarButtonEmits = ButtonEmits;

/**
 * Properties for the toolbar link component.
 */
export interface ToolbarLinkProps extends LinkProps {}

/**
 * Properties for the toolbar separator component.
 */
export interface ToolbarSeparatorProps extends Omit<SeparatorRootProps, 'orientation'> {}

/**
 * Properties for the toolbar toggle group component.
 */
export interface ToolbarToggleGroupProps<
  M extends boolean = false,
  T extends DefinedValue = string
> extends BaseToggleGroupRootProps<M, T> {}

/**
 * Events for the toolbar toggle group component.
 */
export type ToolbarToggleGroupEmits<
  M extends boolean = false,
  T extends DefinedValue = string
> = BaseToggleGroupRootEmits<M, T>;

/**
 * Properties for the toolbar toggle item component.
 */
export interface ToolbarToggleItemProps<T extends DefinedValue = string> extends BaseToggleGroupItemProps<T> {}
