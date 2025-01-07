import { createContext } from '../../composables';
import type { StepperItemContext, StepperRootContext } from './types';

export const [provideStepperRootContext, injectStepperRootContext] = createContext<StepperRootContext>('StepperRoot');

export const [provideStepperItemContext, injectStepperItemContext] = createContext<StepperItemContext>('StepperItem');
