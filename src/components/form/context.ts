import { useContext } from '@soybeanjs/headless/composables';
import type { FormContext } from './types';

export const [provideFormContext, useFormContext] = useContext<FormContext>('Form');
