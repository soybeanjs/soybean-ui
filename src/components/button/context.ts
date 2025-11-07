import { useContext } from '@soybeanjs/headless/composables';
import type { ButtonGroupContextParams } from './types';

export const [provideButtonGroupContext, useButtonGroupContext] = useContext(
  'ButtonGroup',
  (params: ButtonGroupContextParams) => params
);
