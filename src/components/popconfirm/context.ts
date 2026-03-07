import { useContext } from '@soybeanjs/headless/composables';
import type { PopconfirmContext } from './types';

export const [providePopconfirmContext, usePopconfirmContext] = useContext<PopconfirmContext>('Popconfirm');
