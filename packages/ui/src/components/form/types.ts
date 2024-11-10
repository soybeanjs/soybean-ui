import type { RuleExpression } from 'vee-validate';
import type { ClassValueProp } from '../../types';
import type { LabelProps } from '../label/types';

export type FormItemProps = ClassValueProp;

export type FormLabelProps = LabelProps;

export type FormMessageProps = ClassValueProp;

export type FormDescriptionProps = ClassValueProp;

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
