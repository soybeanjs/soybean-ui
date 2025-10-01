import type { ComputedRef, HTMLAttributes, InputHTMLAttributes } from 'vue';
import type { ClassValue } from '../../types';

export interface InputRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface InputControlProps extends /** @vue-ignore */ InputHTMLAttributes {
  /** The default value of the input */
  defaultValue?: string;
  /** The controlled value of the input */
  modelValue?: string;
}

export type InputControlEmits = {
  'update:modelValue': [value: string];
};

export type InputThemeSlot = 'root' | 'control';

export interface InputThemeContextParams {
  ui: ComputedRef<Record<InputThemeSlot, ClassValue>>;
}
