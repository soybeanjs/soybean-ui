import type { ComputedRef, HTMLAttributes } from 'vue';
import type { DataOrientation, DefinedValue, Direction } from '../../types';
import type {
  ToggleGroupItemProps as BaseToggleGroupItemProps,
  ToggleGroupRootEmits as BaseToggleGroupRootEmits,
  ToggleGroupRootProps as BaseToggleGroupRootProps
} from '../toggle-group/types';
import type { ButtonEmits, ButtonProps } from '../button/types';
import type { LinkProps } from '../link/types';
import type { SeparatorRootProps } from '../separator/types';
import type { PrimitiveProps } from '../primitive/types';

export interface ToolbarRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The orientation of the toolbar. */
  orientation?: DataOrientation;
  /** The reading direction of the toolbar. */
  dir?: Direction;
  /** Whether keyboard roving focus loops. */
  loop?: boolean;
}

export interface ToolbarRootContext {
  orientation: ComputedRef<DataOrientation>;
  dir: ComputedRef<Direction>;
}

export interface ToolbarRootContextParams {
  orientation: ComputedRef<DataOrientation>;
  dir: ComputedRef<Direction | undefined>;
}

export interface ToolbarButtonProps extends ButtonProps {}

export type ToolbarButtonEmits = ButtonEmits;

export interface ToolbarLinkProps extends LinkProps {}

export interface ToolbarSeparatorProps extends Omit<SeparatorRootProps, 'orientation'> {}

export interface ToolbarToggleGroupProps<M extends boolean = false, T extends DefinedValue = string>
  extends BaseToggleGroupRootProps<M, T> {}

export type ToolbarToggleGroupEmits<M extends boolean = false, T extends DefinedValue = string> = BaseToggleGroupRootEmits<
  M,
  T
>;

export interface ToolbarToggleItemProps<T extends DefinedValue = string> extends BaseToggleGroupItemProps<T> {}
