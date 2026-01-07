import type { ComputedRef, HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { LabelProps } from '../label/types';

export interface FormFieldProps extends /** @vue-ignore */ HTMLAttributes {
  error?: string;
  isFieldArray?: boolean;
}

export interface FormLabelProps extends LabelProps {}

export interface FormDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface FormErrorProps extends /** @vue-ignore */ HTMLAttributes {}

export interface FormFieldContextParams {
  error: ComputedRef<string | undefined>;
}

export type FormFieldUiSlot = 'field' | 'fieldArray' | 'label' | 'description' | 'error';

export type FormFieldUi = UiClass<FormFieldUiSlot>;
