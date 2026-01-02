import type { FormHTMLAttributes } from 'vue';
import type {
  ClassValue,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldUi,
  FormLabelProps,
  PropsToContext,
  FormFieldArrayProps as _FormFieldArrayProps,
  FormFieldProps as _FormFieldProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface FormFieldProps extends _FormFieldProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<FormFieldUi>;
  label?: string;
  description?: string;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormFieldArrayProps extends _FormFieldArrayProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<FormFieldUi>;
  label?: string;
  description?: string;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormProps extends /** @vue-ignore */ FormHTMLAttributes {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<FormFieldUi>;
  fieldProps?: FormFieldProps;
  fieldArrayProps?: FormFieldArrayProps;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormContextParams extends PropsToContext<FormProps> {}
