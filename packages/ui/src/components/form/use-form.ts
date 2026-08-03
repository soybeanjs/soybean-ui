import { useForm as _useForm } from '@soybeanjs/headless/form';
import type {
  StandardSchemaV1,
  FormValues,
  InferStandardSchemaInput,
  FormFieldComponent,
  FormFieldArrayComponent
} from '@soybeanjs/headless/form';
import FormFieldArray from './form-field-array.vue';
import FormField from './form-field.vue';
import type { UseFormOptions, FormFieldExtraProps, UseFormReturn } from './types';

export function useForm<S extends StandardSchemaV1<FormValues, FormValues>>(options: UseFormOptions<S>) {
  type Values = InferStandardSchemaInput<S>;

  // SFC 组件类型与 FormFieldComponent 构造器签名（泛型构造参数）存在结构性差异，经双重断言收窄为组件类型
  const [context, SFormField, SFormFieldArray] = _useForm<S, FormFieldExtraProps, FormFieldExtraProps>(
    options,
    FormField as unknown as FormFieldComponent<Values, FormFieldExtraProps>,
    FormFieldArray as unknown as FormFieldArrayComponent<Values, FormFieldExtraProps>
  );

  return {
    ...context,
    SFormField,
    SFormFieldArray
  } as UseFormReturn<Values>;
}
