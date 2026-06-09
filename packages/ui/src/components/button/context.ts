import { useContext } from '@soybeanjs/headless/composables';
import type { ButtonGroupContext } from './types';

export const [provideButtonGroupContext, useButtonGroupContext] = useContext<ButtonGroupContext>('ButtonGroup');
