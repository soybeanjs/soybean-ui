import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ClassValue } from '../../types';
import type { LabelProps } from '../label/types';

export interface FormFieldProps extends /** @vue-ignore */ HTMLAttributes {
  name: string;
}

export interface FormFieldArrayProps extends /** @vue-ignore */ HTMLAttributes {
  name: string;
}

export interface FormLabelProps extends LabelProps {}

export interface FormDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface FormErrorProps extends /** @vue-ignore */ HTMLAttributes {}

export type FormFieldThemeSlot = 'field' | 'fieldArray' | 'label' | 'description' | 'error';

export type FormFieldUi = Record<FormFieldThemeSlot, ClassValue>;

export interface FormThemeParams {
  ui?: ComputedRef<FormFieldUi>;
}
