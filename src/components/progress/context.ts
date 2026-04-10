import { shallowRef } from 'vue';
import { useContext } from '@soybeanjs/headless/composables';
import type { LoadingBarProviderContextParams, UseLoadingBarReturn } from './types';

const START_VALUE = 8;
const MAX_TRICKLE_VALUE = 92;
const TRICKLE_INTERVAL = 200;
const RESET_DELAY = 200;

function clampValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

function getStep(value: number) {
  if (value < 20) return 12;
  if (value < 50) return 8;
  if (value < 80) return 4;
  return 2;
}

export const [provideLoadingBarProviderContext, useLoadingBarProvider] = useContext(
  'UiLoadingBarProvider',
  (params: LoadingBarProviderContextParams) => {
    const visible = shallowRef(false);
    const modelValue = shallowRef(0);
    const color = shallowRef(params.color.value);

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resetTimerId: ReturnType<typeof setTimeout> | undefined;

    function clearTrickleTimer() {
      if (!intervalId) return;

      clearInterval(intervalId);
      intervalId = undefined;
    }

    function clearResetTimer() {
      if (!resetTimerId) return;

      clearTimeout(resetTimerId);
      resetTimerId = undefined;
    }

    function clearTimers() {
      clearTrickleTimer();
      clearResetTimer();
    }

    function reset() {
      clearTimers();
      visible.value = false;
      modelValue.value = 0;
      color.value = params.color.value;
    }

    function scheduleReset() {
      clearResetTimer();
      resetTimerId = setTimeout(() => {
        resetTimerId = undefined;
        visible.value = false;
        modelValue.value = 0;
        color.value = params.color.value;
      }, RESET_DELAY);
    }

    function startTrickling() {
      clearTrickleTimer();

      intervalId = setInterval(() => {
        if (modelValue.value >= MAX_TRICKLE_VALUE) {
          clearTrickleTimer();
          return;
        }

        modelValue.value = clampValue(modelValue.value + getStep(modelValue.value));
      }, TRICKLE_INTERVAL);
    }

    const set: UseLoadingBarReturn['set'] = value => {
      clearResetTimer();
      clearTrickleTimer();
      visible.value = true;
      color.value = params.color.value;
      modelValue.value = clampValue(value);

      if (modelValue.value >= 100) {
        scheduleReset();
      }
    };

    const start: UseLoadingBarReturn['start'] = () => {
      clearResetTimer();
      visible.value = true;
      color.value = params.color.value;
      modelValue.value = Math.max(modelValue.value, START_VALUE);
      startTrickling();
    };

    const finish: UseLoadingBarReturn['finish'] = () => {
      clearTrickleTimer();
      clearResetTimer();
      visible.value = true;
      color.value = params.color.value;
      modelValue.value = 100;
      scheduleReset();
    };

    const error: UseLoadingBarReturn['error'] = () => {
      clearTrickleTimer();
      clearResetTimer();
      visible.value = true;
      color.value = params.errorColor.value;
      modelValue.value = 100;
      scheduleReset();
    };

    const clear: UseLoadingBarReturn['clear'] = () => {
      reset();
    };

    const useLoadingBar: UseLoadingBarReturn = {
      start,
      finish,
      error,
      set,
      clear
    };

    if (typeof window !== 'undefined') {
      window.__SoybeanUI_useLoadingBar = useLoadingBar;
    }

    return {
      useLoadingBar,
      clear,
      visible,
      modelValue,
      color
    };
  }
);

export const useLoadingBar = (): UseLoadingBarReturn => {
  if (typeof window !== 'undefined' && window.__SoybeanUI_useLoadingBar) {
    return window.__SoybeanUI_useLoadingBar;
  }

  const { useLoadingBar: $useLoadingBar } = useLoadingBarProvider('UiLoadingBarConsumer');

  return $useLoadingBar;
};
