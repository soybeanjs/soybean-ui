import { defineComponent, h } from 'vue';
import { useForm as useHeadlessForm } from '@soybeanjs/headless/form';
import type { FormValues, InferStandardSchemaInput, StandardSchemaV1, UseFormOptions } from '@soybeanjs/headless/form';
import { Slot } from '@soybeanjs/headless/slot';
import type { Path } from '@soybeanjs/headless/types';
import FormFieldBase from './form-field-base.vue';
import type {
  FormFieldArrayComponent,
  FormFieldArrayProps,
  FormFieldBaseSlotProps,
  FormFieldComponent,
  FormFieldProps
} from './types';

export function useForm<S extends StandardSchemaV1<FormValues, FormValues>>(options: UseFormOptions<S>) {
  type Values = InferStandardSchemaInput<S>;

  const context = useHeadlessForm(options);

  const SFormField = defineComponent(
    (props: FormFieldProps<Values, Path<Values>>, { slots }) => {
      const state = context.useField(props.name, { validate: props.validate, reset: props.reset });

      return () =>
        h(
          FormFieldBase,
          {
            error: state.value.meta.error,
            ...props
          },
          {
            label: () => slots.label?.(state.value),
            description: slots.description ? () => slots.description(state.value) : undefined,
            default: (slotProps: FormFieldBaseSlotProps) => {
              return h(
                Slot,
                {
                  size: props.size,
                  id: slotProps.formFieldId,
                  ariaDescribedBy: slotProps.ariaDescribedBy,
                  ariaInvalid: slotProps.ariaInvalid,
                  name: props.name,
                  modelValue: state.value.value,
                  'onUpdate:modelValue': (value: any) => context.setFieldValue(props.name, value),
                  onBlur: (e: Event) => state.value.onBlur(e, props.name),
                  onChange: () => state.value.onChange(),
                  onInput: () => state.value.onInput()
                },
                {
                  default: () => slots.default?.(state.value)
                }
              );
            }
          }
        );
    },
    { name: 'SFormField', props: ['name'] }
  ) as FormFieldComponent<Values>;

  const SFormFieldArray = defineComponent(
    (props: FormFieldArrayProps<Values, Path<Values>>, { slots }) => {
      const state = context.useFieldArray(props.name, { validate: props.validate, reset: props.reset });

      return () =>
        h(
          FormFieldBase,
          {
            error: state.value.meta.error,
            ...props,
            isFieldArray: true
          },
          {
            label: () => slots.label?.(state.value),
            description: slots.description ? () => slots.description(state.value) : undefined,
            default: () => slots.default?.(state.value)
          }
        );
    },
    { name: 'SFormFieldArray', props: ['name'] }
  ) as FormFieldArrayComponent<Values>;

  return {
    ...context,
    SFormField,
    SFormFieldArray
  };
}
