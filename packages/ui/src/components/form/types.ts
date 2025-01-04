import type { RuleExpression } from 'vee-validate';
import type { ClassValueProp } from '@soybean-ui/primitive';
import type { LabelProps } from '../label';

export interface FormItemProps extends ClassValueProp {}

export interface FormLabelProps extends LabelProps {}

export interface FormMessageProps extends ClassValueProp {}

export interface FormDescriptionProps extends ClassValueProp {}

export type FieldProps<T = unknown> = {
  name: string;
  rules?: RuleExpression<T>;
  validateOnMount?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnInput?: boolean;
  validateOnModelUpdate?: boolean;
  bails?: boolean;
  label?: string;
  uncheckedValue?: T;
  modelValue?: T;
  modelModifiers?: Record<string, boolean>;
  'onUpdate:modelValue'?: (e: T) => unknown;
  standalone?: boolean;
  keepValue?: boolean;
};

export type FormFieldProps<T = unknown> = FormItemProps &
  FieldProps<T> & {
    description?: string;
  };

export interface FormFieldArrayProps extends FormFieldProps {}
