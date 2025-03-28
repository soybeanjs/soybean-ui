import type {
  ClassValue,
  ToggleGroupItemProps as _ToggleGroupItemProps,
  ToggleGroupRootProps as _ToggleGroupRootProps
} from '@soybean-ui/primitives';
import type { ToggleSlots, ToggleVariant } from '@soybean-ui/variants';
import type { ThemeSize } from '../../types';

export type ToggleGroupRootProps<T extends string | string[]> = _ToggleGroupRootProps<T> & {
  size?: ThemeSize;
};

export interface ToggleGroupItemProps extends _ToggleGroupItemProps {
  variant?: ToggleVariant;
  size?: ThemeSize;
}

export type ToggleGroupItemData = Pick<ToggleGroupItemProps, 'value' | 'disabled'>;

export type ToggleGroupUi = Partial<Record<ToggleSlots, ClassValue>>;

export type ToggleGroupProps<
  T extends ToggleGroupItemData = ToggleGroupItemData,
  V extends string | string[] = string | string[]
> = ToggleGroupRootProps<V> & {
  ui?: ToggleGroupUi;
  items: T[];
  variant?: ToggleVariant;
};

export type ToggleGroupRootEmits<ValidValue = string | string[]> = {
  'update:modelValue': [payload: ValidValue];
};

export type ToggleGroupEmits<ValidValue = string | string[]> = ToggleGroupRootEmits<ValidValue>;
