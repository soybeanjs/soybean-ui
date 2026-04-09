import type { HTMLAttributes } from 'vue';
import type { ClassValue, InputOptRootEmits, InputOptRootProps, InputOptSlotData, InputOptUi } from '@soybeanjs/headless';

export interface InputOptProps extends InputOptRootProps {
  class?: ClassValue;
  ui?: Partial<InputOptUi>;
}

export interface InputOptGroupProps extends /** @vue-ignore */ HTMLAttributes {
  class?: ClassValue;
}

export interface InputOptSlotProps extends /** @vue-ignore */ HTMLAttributes {
  class?: ClassValue;
  index: number;
}

export interface InputOptSeparatorProps extends /** @vue-ignore */ HTMLAttributes {
  class?: ClassValue;
}

export type InputOptEmits = InputOptRootEmits;

export type { InputOptSlotData };
