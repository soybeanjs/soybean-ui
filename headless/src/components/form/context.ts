import { computed, useId } from 'vue';
import { useContext, useUiContext } from '../../composables';
import type { FormFieldContextParams, FormFieldUiSlot } from './types';

export const [provideFormFieldContext, useFormFieldContext] = useContext(
  'FormField',
  (params: FormFieldContextParams) => {
    const { error } = params;

    const id = useId();

    const formFieldId = `form-field-${id}`;
    const formDescriptionId = `form-field-description-${id}`;
    const formErrorId = `form-field-error-${id}`;

    const ariaDescribedBy = computed(() => (error.value ? `${formDescriptionId} ${formErrorId}` : formDescriptionId));
    const ariaInvalid = computed(() => Boolean(error.value));

    return {
      formFieldId,
      formDescriptionId,
      formErrorId,
      ariaDescribedBy,
      ariaInvalid
    };
  }
);

export const [provideFormFieldUi, useFormFieldUi] = useUiContext<FormFieldUiSlot>('FormFieldUi');
