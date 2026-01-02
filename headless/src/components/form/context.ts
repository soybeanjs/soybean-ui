import { useId } from 'vue';
import { useContext, useUiContext } from '../../composables';
import type { FormFieldUiSlot } from './types';

export const [provideFormFieldContext, useFormFieldContext] = useContext('FormField', () => {
  const id = useId();

  const formFieldId = `form-field-${id}`;
  const formDescriptionId = `form-field-description-${id}`;
  const formErrorId = `form-field-error-${id}`;

  return {
    formFieldId,
    formDescriptionId,
    formErrorId
  };
});

export const [provideFormFieldUi, useFormFieldUi] = useUiContext<FormFieldUiSlot>('FormFieldUi');
