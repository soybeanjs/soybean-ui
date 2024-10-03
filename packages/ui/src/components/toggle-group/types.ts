import type {
  ToggleGroupItemProps as _ToggleGroupItemProps,
  ToggleGroupRootProps as _ToggleGroupRootProps
} from 'radix-vue';
import type { ToggleVariant } from '@soybean-ui/variants';
import type { ClassValueProp, SingleOrMultipleType, ThemeSize } from '../../types';

export type ToggleGroupRootProps<ValidValue = string | string[], ExplicitType = SingleOrMultipleType> = ClassValueProp &
  Omit<_ToggleGroupRootProps<ValidValue, ExplicitType>, 'as' | 'asChild'> & {
    size?: ThemeSize;
  };

export type ToggleGroupItemProps = ClassValueProp &
  Omit<_ToggleGroupItemProps, 'as' | 'asChild'> & {
    variant?: ToggleVariant;
    size?: ThemeSize;
  };

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
