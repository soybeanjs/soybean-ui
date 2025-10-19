import type { FormHTMLAttributes } from 'vue';
import type {
  ClassValue,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldThemeSlot,
  FormLabelProps,
  PropsToContext,
  FormFieldArrayProps as _FormFieldArrayProps,
  FormFieldProps as _FormFieldProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type FormFieldUi = Partial<Record<FormFieldThemeSlot, ClassValue>>;

export interface FormFieldProps extends _FormFieldProps {
  size?: ThemeSize;
  ui?: FormFieldUi;
  label?: string;
  description?: string;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormFieldArrayProps extends _FormFieldArrayProps {
  size?: ThemeSize;
  ui?: FormFieldUi;
  label?: string;
  description?: string;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormProps extends /** @vue-ignore */ FormHTMLAttributes {
  size?: ThemeSize;
  ui?: FormFieldUi;
  fieldProps?: FormFieldProps;
  fieldArrayProps?: FormFieldArrayProps;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormContextParams extends PropsToContext<FormProps> {}
