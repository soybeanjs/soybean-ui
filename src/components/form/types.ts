import type {
  ComponentOptionsMixin,
  CreateComponentPublicInstanceWithMixins,
  EmitsOptions,
  FormHTMLAttributes,
  PublicProps,
  SlotsType
} from 'vue';
import type {
  ClassValue,
  FormDescriptionProps,
  FormErrorProps,
  FormFieldArrayStates,
  FormFieldState,
  FormFieldUi,
  FormLabelProps,
  FormRegisterOptions,
  FormValues,
  Path,
  PathValue,
  PropsToContext,
  FormFieldProps as _FormFieldProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface FormFieldBaseProps extends Omit<_FormFieldProps, 'class'> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<FormFieldUi>;
  label?: string;
  description?: string;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormFieldBaseSlotProps {
  formFieldId: string;
  ariaDescribedBy: string;
  ariaInvalid: boolean;
}

export interface FormFieldProps<Values extends FormValues, Name extends Path<Values>>
  extends Omit<FormFieldBaseProps, 'error' | 'fieldArray'>, FormRegisterOptions<PathValue<Values, Name>> {
  name: Name;
}

export type FormFieldSlots<Values extends FormValues, Name extends Path<Values>> = SlotsType<{
  default: (props: FormFieldState<Values, Name>) => any;
  label: (props: FormFieldState<Values, Name>) => any;
  description: (props: FormFieldState<Values, Name>) => any;
}>;

export type FormFieldComponent<Values extends FormValues> = new <Name extends Path<Values>>(
  props: FormFieldProps<Values, Name> & PublicProps
) => CreateComponentPublicInstanceWithMixins<
  FormFieldProps<Values, Name>,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  PublicProps,
  {},
  false,
  {},
  FormFieldSlots<Values, Name>
>;

export type FormFieldArrayProps<Values extends FormValues, Name extends Path<Values>> = FormFieldProps<Values, Name>;

export type FormFieldArraySlots<Values extends FormValues, Name extends Path<Values>> = SlotsType<{
  default: (props: FormFieldArrayStates<Values, Name>) => any;
  label: (props: FormFieldArrayStates<Values, Name>) => any;
  description: (props: FormFieldArrayStates<Values, Name>) => any;
}>;

export type FormFieldArrayComponent<Values extends FormValues> = new <Name extends Path<Values>>(
  props: FormFieldArrayProps<Values, Name> & PublicProps
) => CreateComponentPublicInstanceWithMixins<
  FormFieldArrayProps<Values, Name>,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  PublicProps,
  {},
  false,
  {},
  FormFieldArraySlots<Values, Name>
>;

export interface FormProps extends /** @vue-ignore */ FormHTMLAttributes {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<FormFieldUi>;
  fieldProps?: FormFieldBaseProps;
  fieldArrayProps?: FormFieldBaseProps;
  labelProps?: FormLabelProps;
  descriptionProps?: FormDescriptionProps;
  errorProps?: FormErrorProps;
}

export interface FormContextParams extends PropsToContext<FormProps> {}
