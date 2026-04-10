import { shallowRef, useId } from 'vue';
import { useContext, useUiContext } from '../../composables';
import { useDirection } from '../config-provider/context';
import type { StepperItemContext, StepperItemContextParams, StepperRootContext, StepperUiSlot } from './types';

export const [provideStepperRootContext, useStepperRootContext] = useContext('StepperRoot', (params: StepperRootContext) => {
  const dir = useDirection(params.dir);

  return {
    ...params,
    dir
  };
});

export const [provideStepperItemContext, useStepperItemContext] = useContext(
  'StepperItem',
  (params: StepperItemContextParams) => {
    const titleId = shallowRef(`soybean-stepper-title-${useId()}`);
    const descriptionId = shallowRef(`soybean-stepper-description-${useId()}`);

    return {
      ...params,
      titleId,
      descriptionId
    } satisfies StepperItemContext;
  }
);

export const [provideStepperUi, useStepperUi] = useUiContext<StepperUiSlot>('StepperUi');
