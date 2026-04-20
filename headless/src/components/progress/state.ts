import type { ProgressOptions, ProgressPromise, ProgressRenderState, ProgressSubscriber } from './types';
import {
  clampProgressValue,
  defaultProgressOptions,
  getProgressDecrementAmount,
  getProgressIncrementAmount
} from './shared';

class ProgressObserver {
  private subscribers: ProgressSubscriber[] = [];
  private mountedCount = 0;
  private status: number | null = null;
  private value: number | null = null;
  private visible = false;
  private isPaused = false;
  private settings = { ...defaultProgressOptions };
  private trickleTimer: ReturnType<typeof setTimeout> | undefined;
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  subscribe = (subscriber: ProgressSubscriber) => {
    this.subscribers.push(subscriber);
    subscriber(this.getState());

    return () => {
      const index = this.subscribers.indexOf(subscriber);

      if (index >= 0) {
        this.subscribers.splice(index, 1);
      }
    };
  };

  mount = () => {
    this.mountedCount += 1;

    return () => {
      this.mountedCount = Math.max(0, this.mountedCount - 1);
    };
  };

  getState = (): ProgressRenderState => {
    return {
      visible: this.visible,
      value: this.settings.indeterminate && this.visible ? null : this.value,
      settings: { ...this.settings }
    };
  };

  configure = (options: ProgressOptions = {}) => {
    this.settings = {
      ...this.settings,
      ...Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined))
    };

    if (typeof this.status === 'number') {
      const nextValue = clampProgressValue(this.status, this.settings.minimum, this.settings.maximum);

      this.status = nextValue === this.settings.maximum ? null : nextValue;
      this.value = nextValue;
    }

    this.publish();

    return this;
  };

  reset = () => {
    this.clearTimers();
    this.status = null;
    this.value = null;
    this.visible = false;
    this.isPaused = false;
    this.settings = { ...defaultProgressOptions };
    this.publish();

    return this;
  };

  isStarted = () => typeof this.status === 'number';

  isRendered = () => this.mountedCount > 0;

  set = (value: number) => {
    if (this.isPaused) {
      return this;
    }

    const nextValue = clampProgressValue(value, this.settings.minimum, this.settings.maximum);

    this.clearResetTimer();
    this.visible = true;
    this.value = nextValue;
    this.status = nextValue === this.settings.maximum ? null : nextValue;
    this.publish();

    if (nextValue === this.settings.maximum) {
      this.clearTrickleTimer();
      this.scheduleReset();
    }

    return this;
  };

  start = () => {
    if (!this.isStarted()) {
      this.set(0);
    }

    if (this.settings.trickle) {
      this.startTrickling();
    }

    return this;
  };

  done = (force?: boolean) => {
    if (!force && !this.isStarted()) {
      return this;
    }

    if (this.settings.indeterminate) {
      this.clearTrickleTimer();
      this.clearResetTimer();
      this.visible = true;
      this.status = null;
      this.value = null;
      this.publish();
      this.scheduleReset();

      return this;
    }

    return this.inc(0.3 + 0.5 * Math.random()).set(this.settings.maximum);
  };

  inc = (amount?: number) => {
    if (this.isPaused || this.settings.indeterminate) {
      return this;
    }

    if (!this.isStarted()) {
      return this.start();
    }

    const currentValue = this.status;

    if (currentValue === null || currentValue > this.settings.maximum) {
      return this;
    }

    const currentRatio = currentValue / this.settings.maximum;
    const nextAmount = amount ?? getProgressIncrementAmount(currentRatio) * this.settings.maximum;
    const maxValue = this.settings.maximum * 0.994;

    return this.set(clampProgressValue(currentValue + nextAmount, 0, maxValue));
  };

  dec = (amount?: number) => {
    if (this.isPaused || this.settings.indeterminate || this.status === null) {
      return this;
    }

    const currentRatio = this.status / this.settings.maximum;
    const nextAmount = amount ?? getProgressDecrementAmount(currentRatio) * this.settings.maximum;
    const maxValue = this.settings.maximum * 0.994;

    return this.set(clampProgressValue(this.status - nextAmount, 0, maxValue));
  };

  trickle = () => {
    if (this.isPaused || this.settings.indeterminate) {
      return this;
    }

    return this.inc();
  };

  promise = <Data>(promise: ProgressPromise<Data>) => {
    const resolved = typeof promise === 'function' ? promise() : promise;

    if (!resolved || typeof resolved.then !== 'function') {
      return this;
    }

    this.start();

    Promise.resolve(resolved).then(
      () => {
        this.done();
      },
      () => {
        this.done(true);
      }
    );

    return this;
  };

  remove = () => {
    this.clearTimers();
    this.status = null;
    this.value = null;
    this.visible = false;
    this.publish();

    return this;
  };

  pause = () => {
    if (!this.isStarted() || this.settings.indeterminate) {
      return this;
    }

    this.isPaused = true;
    this.clearTrickleTimer();

    return this;
  };

  resume = () => {
    if (!this.isStarted() || this.settings.indeterminate) {
      return this;
    }

    this.isPaused = false;

    if (this.settings.trickle) {
      this.startTrickling();
    }

    return this;
  };

  private publish() {
    const nextState = this.getState();

    this.subscribers.forEach(subscriber => {
      subscriber(nextState);
    });
  }

  private clearTrickleTimer() {
    if (this.trickleTimer) {
      clearTimeout(this.trickleTimer);
      this.trickleTimer = undefined;
    }
  }

  private clearResetTimer() {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = undefined;
    }
  }

  private clearTimers() {
    this.clearTrickleTimer();
    this.clearResetTimer();
  }

  private scheduleReset() {
    this.clearResetTimer();
    this.resetTimer = setTimeout(() => {
      this.resetTimer = undefined;
      this.visible = false;
      this.value = null;
      this.publish();
    }, this.settings.speed);
  }

  private startTrickling() {
    if (this.trickleTimer) {
      return;
    }

    const tick = () => {
      this.trickleTimer = undefined;

      if (this.isPaused || !this.isStarted()) {
        return;
      }

      this.trickle();

      if (!this.isPaused && this.isStarted()) {
        this.trickleTimer = setTimeout(tick, this.settings.trickleSpeed);
      }
    };

    this.trickleTimer = setTimeout(tick, this.settings.trickleSpeed);
  }
}

export const ProgressState = new ProgressObserver();

/**
 * Shared imperative progress controller.
 *
 * Calling `progress()` is equivalent to `progress.start()`.
 */
export const progress = Object.assign(ProgressState.start, {
  configure: ProgressState.configure,
  reset: ProgressState.reset,
  isStarted: ProgressState.isStarted,
  isRendered: ProgressState.isRendered,
  set: ProgressState.set,
  start: ProgressState.start,
  done: ProgressState.done,
  inc: ProgressState.inc,
  dec: ProgressState.dec,
  trickle: ProgressState.trickle,
  promise: ProgressState.promise,
  remove: ProgressState.remove,
  pause: ProgressState.pause,
  resume: ProgressState.resume
});
