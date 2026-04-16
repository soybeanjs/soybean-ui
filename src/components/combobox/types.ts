import type {
  ComboboxCompactEmits,
  ComboboxCompactProps,
  ComboboxCompactSlots,
  ComboboxUi
} from '@soybeanjs/headless/combobox';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface ComboboxProps<M extends boolean = false> extends ComboboxCompactProps<M> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ComboboxUi>;
}

export type ComboboxEmits<M extends boolean = false> = ComboboxCompactEmits<M>;

export type ComboboxSlots<M extends boolean = false> = ComboboxCompactSlots<M>;
