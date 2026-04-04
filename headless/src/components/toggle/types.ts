import type { ButtonHTMLAttributes } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

export type ToggleState = 'on' | 'off';

export interface ToggleProps extends PrimitiveProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'onClick'> {
  /**
   * The pressed state of the toggle when it is initially rendered.
   */
  defaultValue?: boolean;
  /**
   * The controlled pressed state of the toggle. Can be bound with v-model.
   */
  modelValue?: boolean;
  /**
   * When `true`, prevents the user from interacting with the toggle.
   */
  disabled?: boolean;
}

export type ToggleEmits = {
  /**
   * Event handler called when the pressed state changes.
   */
  'update:modelValue': [value: boolean];
};
