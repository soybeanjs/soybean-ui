import { reactive } from 'vue';
import { createGlobalState } from '@vueuse/core';
import type { DismissableLayerState } from './types';

export const useDismissableLayerState = createGlobalState(() => {
  const state: DismissableLayerState = reactive({
    layersRoot: new Set<HTMLElement>(),
    layersWithOutsidePointerEventsDisabled: new Set<HTMLElement>(),
    branches: new Set<HTMLElement>()
  });

  return state;
});
