import type {
  ToggleGroupItemProps as $ToggleGroupItemProps,
  ToggleGroupRootProps as $ToggleGroupRootProps
} from 'radix-vue';
import type { ToggleSize, ToggleVariant } from '@soybean-ui/variants';
import type { ClassValue, SingleOrMultipleType } from '../../types';

export type ToggleGroupRootProps<
  ValidValue = string | string[],
  ExplicitType = SingleOrMultipleType
> = $ToggleGroupRootProps<ValidValue, ExplicitType> & {
  class?: ClassValue;
  size?: ToggleSize;
};

export type ToggleGroupItemProps = $ToggleGroupItemProps & {
  class?: ClassValue;
  variant?: ToggleVariant;
  size?: ToggleSize;
};

export type ToggleGroupItemData = Pick<ToggleGroupItemProps, 'value' | 'disabled'>;

export type ToggleGroupProps<
  T extends ToggleGroupItemData = ToggleGroupItemData,
  ValidValue = string | string[],
  ExplicitType = SingleOrMultipleType
> = $ToggleGroupRootProps<ValidValue, ExplicitType> & {
  items: T[];
  class?: ClassValue;
  variant?: ToggleVariant;
  size?: ToggleSize;
};
