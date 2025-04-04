import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { FormSlots, ThemeSize } from '@soybean-ui/variants';
import type { RuleExpression } from 'vee-validate';
import type { LabelProps } from '../label';

type FormUi = Partial<Record<FormSlots, ClassValue>>;

export interface FormItemProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface FormLabelProps extends LabelProps {
  size?: ThemeSize;
  label?: string;
}

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
    ui?: FormUi;
    description?: string;
  };

export interface FormFieldArrayProps extends FormFieldProps {}
