import { useForm as _useForm } from '@soybeanjs/headless/form';
import type {
  FormFieldArrayComponent,
  FormFieldComponent,
  FormValues,
  InferStandardSchemaInput,
  StandardSchemaV1
} from '@soybeanjs/headless/form';
import SFormFieldArray from './form-field-array.vue';
import SFormField from './form-field.vue';
import type { FormFieldExtraProps, UseFormOptions, UseFormReturn } from './types';

export function useForm<S extends StandardSchemaV1<FormValues, FormValues>>(
  options: UseFormOptions<S>
): UseFormReturn<InferStandardSchemaInput<S>> {
  type Values = InferStandardSchemaInput<S>;

  const context = _useForm(options);

  // SFC 组件类型与 FormFieldComponent 构造器签名（泛型构造参数）存在结构性差异，经双重断言收窄为组件类型
  return {
    ...context,
    SFormField: SFormField as unknown as FormFieldComponent<Values, FormFieldExtraProps>,
    SFormFieldArray: SFormFieldArray as unknown as FormFieldArrayComponent<Values, FormFieldExtraProps>
  };
}
