import { useContext } from '@soybeanjs/headless/composables';
import type { FormContextParams } from './types';

export const [provideFormContext, useFormContext] = useContext('Form', (params: FormContextParams) => params);
