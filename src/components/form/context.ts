import { useId } from 'vue';
import { useContext } from '../../composables';
import type { FormThemeParams } from './types';

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

export const [provideFormThemeContext, useFormThemeContext] = useContext(
  'FormTheme',
  (params: FormThemeParams) => params
);
