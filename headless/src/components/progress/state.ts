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

class LoadingBarObserver {
  private subscribers: LoadingBarSubscriber[] = [];
  private snapshot: LoadingBarSnapshot = createSnapshot();
  private trickleTimerId: ReturnType<typeof setInterval> | undefined;
  private resetTimerId: ReturnType<typeof setTimeout> | undefined;

  subscribe = (subscriber: LoadingBarSubscriber) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);

      if (index >= 0) {
        this.subscribers.splice(index, 1);
      }
    };
  };

  getSnapshot = () => createSnapshot(this.snapshot);

  start = () => {
    this.clearResetTimer();
    this.setSnapshot({
      visible: true,
      status: 'default',
      modelValue: Math.max(this.snapshot.modelValue, START_VALUE)
    });
    this.startTrickling();
  };

  finish = () => {
    this.clearTrickleTimer();
    this.clearResetTimer();
    this.setSnapshot({
      visible: true,
      status: 'default',
      modelValue: 100
    });
    this.scheduleReset();
  };

  error = () => {
    this.clearTrickleTimer();
    this.clearResetTimer();
    this.setSnapshot({
      visible: true,
      status: 'error',
      modelValue: 100
    });
    this.scheduleReset();
  };

  set = (value: number) => {
    this.clearResetTimer();
    this.clearTrickleTimer();
    this.setSnapshot({
      visible: true,
      status: 'default',
      modelValue: clampValue(value)
    });

    if (this.snapshot.modelValue >= 100) {
      this.scheduleReset();
    }
  };

  clear = () => {
    this.reset();
  };

  private publish() {
    const snapshot = this.getSnapshot();

    this.subscribers.forEach(subscriber => subscriber(snapshot));
  }

  private setSnapshot(snapshot: Partial<LoadingBarSnapshot>) {
    this.snapshot = {
      ...this.snapshot,
      ...snapshot
    };
    this.publish();
  }

  private reset() {
    this.clearTimers();
    this.snapshot = createSnapshot();
    this.publish();
  }

  private clearTrickleTimer() {
    if (!this.trickleTimerId) return;

    clearInterval(this.trickleTimerId);
    this.trickleTimerId = undefined;
  }

  private clearResetTimer() {
    if (!this.resetTimerId) return;

    clearTimeout(this.resetTimerId);
    this.resetTimerId = undefined;
  }

  private clearTimers() {
    this.clearTrickleTimer();
    this.clearResetTimer();
  }

  private scheduleReset() {
    this.clearResetTimer();
    this.resetTimerId = setTimeout(() => {
      this.resetTimerId = undefined;
      this.reset();
    }, RESET_DELAY);
  }

  private startTrickling() {
    this.clearTrickleTimer();

    this.trickleTimerId = setInterval(() => {
      if (this.snapshot.modelValue >= MAX_TRICKLE_VALUE) {
        this.clearTrickleTimer();
        return;
      }

      this.setSnapshot({
        modelValue: clampValue(this.snapshot.modelValue + getStep(this.snapshot.modelValue))
      });
    }, TRICKLE_INTERVAL);
  }
}

export const LoadingBarState = new LoadingBarObserver();

const loadingBar: UseLoadingBarReturn = {
  start: () => LoadingBarState.start(),
  finish: () => LoadingBarState.finish(),
  error: () => LoadingBarState.error(),
  set: value => LoadingBarState.set(value),
  clear: () => LoadingBarState.clear()
};

export const useLoadingBar = (): UseLoadingBarReturn => loadingBar;
