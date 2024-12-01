import type {
  SingleOrMultipleType,
  ToggleGroupItemProps as _ToggleGroupItemProps,
  ToggleGroupRootProps as _ToggleGroupRootProps
} from '@soybean-ui/primitive';
import type { ToggleVariant } from '@soybean-ui/variants';
import type { ThemeSize } from '../../types';

export type ToggleGroupRootProps<
  ValidValue = string | string[],
  ExplicitType = SingleOrMultipleType
> = _ToggleGroupRootProps<ValidValue, ExplicitType> & {
  size?: ThemeSize;
};

export interface ToggleGroupItemProps extends _ToggleGroupItemProps {
  variant?: ToggleVariant;
  size?: ThemeSize;
}

export type ToggleGroupItemData = Pick<ToggleGroupItemProps, 'value' | 'disabled'>;

export type ToggleGroupProps<
  T extends ToggleGroupItemData = ToggleGroupItemData,
  ValidValue = string | string[],
  ExplicitType = SingleOrMultipleType
> = ToggleGroupRootProps<ValidValue, ExplicitType> & {
  items: T[];
  variant?: ToggleVariant;
};

export type ToggleGroupRootEmits<ValidValue = string | string[]> = {
  'update:modelValue': [payload: ValidValue];
};

export type ToggleGroupEmits<ValidValue = string | string[]> = ToggleGroupRootEmits<ValidValue>;
