import { useContext } from '@headless/composables';
import type { ButtonGroupContextParams } from './types';

export const [provideButtonGroupContext, useButtonGroupContext] = useContext(
  'ButtonGroup',
  (params: ButtonGroupContextParams) => params
);
