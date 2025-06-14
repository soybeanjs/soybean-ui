import { useContext } from '@headless/composables';
import type { DrawerSizeContextParams } from './types';

export const [provideDrawerSizeContext, useDrawerSizeContext] = useContext(
  'DrawerSizeContext',
  (params: DrawerSizeContextParams) => params
);
