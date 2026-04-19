import type { LoadingBarSnapshot, LoadingBarSubscriber, UseLoadingBarReturn } from './types';

const START_VALUE = 8;
const MAX_TRICKLE_VALUE = 92;
const TRICKLE_INTERVAL = 200;
const RESET_DELAY = 200;

const INITIAL_LOADING_BAR_SNAPSHOT: LoadingBarSnapshot = {
  visible: false,
  modelValue: 0,
  status: 'default'
};

function clampValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

function getStep(value: number) {
  if (value < 20) return 12;
  if (value < 50) return 8;
  if (value < 80) return 4;
  return 2;
}

function createSnapshot(snapshot: LoadingBarSnapshot = INITIAL_LOADING_BAR_SNAPSHOT): LoadingBarSnapshot {
  return {
    visible: snapshot.visible,
    modelValue: snapshot.modelValue,
    status: snapshot.status
  };
}

function createLoadingBarObserver() {
  let subscribers: LoadingBarSubscriber[] = [];
  let snapshot: LoadingBarSnapshot = createSnapshot();
  let trickleTimerId: ReturnType<typeof setInterval> | undefined;
  let resetTimerId: ReturnType<typeof setTimeout> | undefined;

  const subscribe = (subscriber: LoadingBarSubscriber) => {
    subscribers.push(subscriber);

    return () => {
      const index = subscribers.indexOf(subscriber);

      if (index >= 0) {
        subscribers.splice(index, 1);
      }
    };
  };

  const getSnapshot = () => createSnapshot(snapshot);

  const publish = () => {
    const nextSnapshot = getSnapshot();

    subscribers.forEach(subscriber => subscriber(nextSnapshot));
  };

  const setSnapshot = (nextSnapshot: Partial<LoadingBarSnapshot>) => {
    snapshot = {
      ...snapshot,
      ...nextSnapshot
    };
    publish();
  };

  const clearTrickleTimer = () => {
    if (!trickleTimerId) return;

    clearInterval(trickleTimerId);
    trickleTimerId = undefined;
  };

  const clearResetTimer = () => {
    if (!resetTimerId) return;

    clearTimeout(resetTimerId);
    resetTimerId = undefined;
  };

  const clearTimers = () => {
    clearTrickleTimer();
    clearResetTimer();
  };

  const reset = () => {
    clearTimers();
    snapshot = createSnapshot();
    publish();
  };

  const scheduleReset = () => {
    clearResetTimer();
    resetTimerId = setTimeout(() => {
      resetTimerId = undefined;
      reset();
    }, RESET_DELAY);
  };

  const startTrickling = () => {
    clearTrickleTimer();

    trickleTimerId = setInterval(() => {
      if (snapshot.modelValue >= MAX_TRICKLE_VALUE) {
        clearTrickleTimer();
        return;
      }

      setSnapshot({
        modelValue: clampValue(snapshot.modelValue + getStep(snapshot.modelValue))
      });
    }, TRICKLE_INTERVAL);
  };

  const start = () => {
    clearResetTimer();
    setSnapshot({
      visible: true,
      status: 'default',
      modelValue: Math.max(snapshot.modelValue, START_VALUE)
    });
    startTrickling();
  };

  const finish = () => {
    clearTrickleTimer();
    clearResetTimer();
    setSnapshot({
      visible: true,
      status: 'default',
      modelValue: 100
    });
    scheduleReset();
  };

  const error = () => {
    clearTrickleTimer();
    clearResetTimer();
    setSnapshot({
      visible: true,
      status: 'error',
      modelValue: 100
    });
    scheduleReset();
  };

  const set = (value: number) => {
    clearResetTimer();
    clearTrickleTimer();
    setSnapshot({
      visible: true,
      status: 'default',
      modelValue: clampValue(value)
    });

    if (snapshot.modelValue >= 100) {
      scheduleReset();
    }
  };

  return {
    subscribe,
    getSnapshot,
    start,
    finish,
    error,
    set,
    clear: reset
  };
}

export const loadingBarObserver = createLoadingBarObserver();

const loadingBar: UseLoadingBarReturn = {
  start: () => loadingBarObserver.start(),
  finish: () => loadingBarObserver.finish(),
  error: () => loadingBarObserver.error(),
  set: value => loadingBarObserver.set(value),
  clear: () => loadingBarObserver.clear()
};

export const useLoadingBar = (): UseLoadingBarReturn => loadingBar;
