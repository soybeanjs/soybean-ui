import type { SelectCompactEmits, SelectCompactProps, SelectCompactSlots, SelectUi } from '@soybeanjs/headless/select';
import type { ClassValue, DefinedValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface SelectProps<
  T extends DefinedValue = DefinedValue,
  M extends boolean = false
> extends SelectCompactProps<T, M> {
  /**
   * the class of select trigger
   */
  class?: ClassValue;
  ui?: Partial<SelectUi>;
  size?: ThemeSize;
}

export type SelectEmits<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectCompactEmits<T, M>;

export type SelectSlots<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectCompactSlots<T, M>;

export type {
  SelectSingleOptionData,
  SelectGroupOptionData,
  SelectOptionData,
  SelectItemEvent
} from '@soybeanjs/headless/select';
