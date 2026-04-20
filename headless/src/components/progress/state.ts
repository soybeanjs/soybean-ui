import type {
  ProgressAnimateEasing,
  ProgressAnimateOptions,
  ProgressOptions,
  ProgressPromise,
  ProgressRenderState,
  ProgressSubscriber
} from './types';
import {
  clampProgressValue,
  defaultProgressOptions,
  getProgressDecrementAmount,
  getProgressIncrementAmount,
  getProgressTrickleAmount,
  normalizeProgressOptions
} from './shared';

const PROGRESS_ANIMATION_FRAME_DURATION = 16;

interface ProgressAnimation {
  duration: number;
  easing: (value: number) => number;
  elapsed: number;
  fromValue: number;
  renderSpeed: number;
  startedAt: number;
  toValue: number;
}

function isPositiveNumber(value: number | undefined): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && value > 0;
}

function getNow() {
  return Date.now();
}

function resolveProgressAnimateEasing(easing: ProgressAnimateEasing | undefined) {
  if (typeof easing === 'function') {
    return easing;
  }

  switch (easing) {
    case 'ease-in':
      return (value: number) => value ** 3;
    case 'ease-out':
      return (value: number) => 1 - (1 - value) ** 3;
    case 'ease-in-out':
      return (value: number) => {
        if (value < 0.5) {
          return 4 * value ** 3;
        }

        return 1 - (-2 * value + 2) ** 3 / 2;
      };
    default:
      return (value: number) => value;
  }
}

function getProgressAnimationRenderSpeed(duration: number) {
  return Math.min(80, Math.max(PROGRESS_ANIMATION_FRAME_DURATION, duration / 8));
}

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
  private startDelayTimer: ReturnType<typeof setTimeout> | undefined;
  private stopDelayTimer: ReturnType<typeof setTimeout> | undefined;
  private forcedStopDelayTimer: ReturnType<typeof setTimeout> | undefined;
  private animation: ProgressAnimation | null = null;
  private animationTimer: ReturnType<typeof setTimeout> | undefined;
  private renderEasingOverride: string | null = null;
  private renderSpeedOverride: number | null = null;

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

      if (this.mountedCount === 0) {
        this.remove();
      }
    };
  };

  getState = (): ProgressRenderState => {
    const settings = {
      ...this.settings,
      easing: this.getRenderEasing(),
      speed: this.getRenderSpeed()
    };

    return {
      visible: this.visible,
      value: this.settings.indeterminate && this.visible ? null : this.value,
      settings
    };
  };

  configure = (options: ProgressOptions = {}) => {
    this.settings = normalizeProgressOptions({
      ...this.settings,
      ...Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined))
    });

    if (typeof this.status === 'number') {
      const nextValue = clampProgressValue(this.status, this.settings.minimum, this.settings.maximum);

      this.status = nextValue === this.settings.maximum ? null : nextValue;
      this.value = nextValue;
    }

    this.clearTrickleTimer();

    if (this.settings.trickle && !this.settings.indeterminate && this.isStarted() && !this.isPaused) {
      this.startTrickling();
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

    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.stopAnimation();

    return this.applyValue(value, this.settings.minimum);
  };

  start = (startPosition = this.settings.startPosition, delay = this.settings.delay) => {
    this.clearStopTimers();
    this.clearStartDelayTimer();
    this.stopAnimation();

    const runStart = () => {
      this.startDelayTimer = undefined;
      this.clearResetTimer();

      if (!this.isStarted()) {
        this.set(startPosition);
      }

      if (this.settings.trickle) {
        this.startTrickling();
      }
    };

    if (delay > 0) {
      this.startDelayTimer = setTimeout(runStart, delay);

      return this;
    }

    runStart();

    return this;
  };

  stop = (stopDelay = this.settings.stopDelay, forcedStopDelay = this.settings.forcedStopDelay) => {
    this.clearStartDelayTimer();
    this.clearStopTimers();

    const runStop = () => {
      this.stopDelayTimer = setTimeout(() => {
        this.stopDelayTimer = undefined;

        if (!this.isStarted()) {
          return;
        }

        this.done();
      }, stopDelay);
    };

    if (forcedStopDelay > 0) {
      this.forcedStopDelayTimer = setTimeout(() => {
        this.forcedStopDelayTimer = undefined;
        runStop();
      }, forcedStopDelay);

      return this;
    }

    runStop();

    return this;
  };

  done = (force?: boolean) => {
    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.stopAnimation();

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

    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.stopAnimation();

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

    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.stopAnimation();

    const currentRatio = this.status / this.settings.maximum;
    const nextAmount = amount ?? getProgressDecrementAmount(currentRatio) * this.settings.maximum;
    const maxValue = this.settings.maximum * 0.994;

    return this.set(clampProgressValue(this.status - nextAmount, 0, maxValue));
  };

  trickle = () => {
    if (this.isPaused || this.settings.indeterminate) {
      return this;
    }

    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.stopAnimation();

    return this.inc(getProgressTrickleAmount(this.settings.maximum));
  };

  animate = (value: number, options: ProgressAnimateOptions = {}) => {
    if (this.settings.indeterminate) {
      return this;
    }

    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.clearResetTimer();
    this.clearTrickleTimer();
    this.clearAnimationTimer();

    const fromValue = clampProgressValue(options.from ?? this.value ?? 0, 0, this.settings.maximum);
    const toValue = clampProgressValue(value, 0, this.settings.maximum);
    const duration = isPositiveNumber(options.duration) ? options.duration : this.settings.speed;

    this.isPaused = false;
    this.applyValue(fromValue, 0);

    if (duration <= PROGRESS_ANIMATION_FRAME_DURATION || fromValue === toValue) {
      return this.applyValue(toValue, 0);
    }

    this.animation = {
      duration,
      easing: resolveProgressAnimateEasing(options.easing),
      elapsed: 0,
      fromValue,
      renderSpeed: getProgressAnimationRenderSpeed(duration),
      startedAt: getNow(),
      toValue
    };
    this.renderEasingOverride = 'linear';
    this.renderSpeedOverride = this.animation.renderSpeed;
    this.startAnimating();

    return this;
  };

  promise = <Data>(promise: ProgressPromise<Data>) => {
    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.stopAnimation();

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
    this.isPaused = false;
    this.publish();

    return this;
  };

  pause = () => {
    if ((!this.isStarted() && this.animation === null) || this.settings.indeterminate) {
      return this;
    }

    this.isPaused = true;
    this.clearTrickleTimer();
    this.pauseAnimation();

    return this;
  };

  resume = () => {
    if ((!this.isStarted() && this.animation === null) || this.settings.indeterminate) {
      return this;
    }

    this.isPaused = false;

    if (this.animation) {
      this.resumeAnimation();

      return this;
    }

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

  private clearStartDelayTimer() {
    if (this.startDelayTimer) {
      clearTimeout(this.startDelayTimer);
      this.startDelayTimer = undefined;
    }
  }

  private clearStopTimers() {
    if (this.stopDelayTimer) {
      clearTimeout(this.stopDelayTimer);
      this.stopDelayTimer = undefined;
    }

    if (this.forcedStopDelayTimer) {
      clearTimeout(this.forcedStopDelayTimer);
      this.forcedStopDelayTimer = undefined;
    }
  }

  private clearTimers() {
    this.clearStartDelayTimer();
    this.clearStopTimers();
    this.clearTrickleTimer();
    this.clearResetTimer();
    this.stopAnimation();
  }

  private scheduleReset() {
    this.clearResetTimer();
    this.resetTimer = setTimeout(() => {
      this.resetTimer = undefined;
      this.visible = false;
      this.value = null;
      this.publish();
    }, this.getRenderSpeed());
  }

  private applyValue(value: number, minimum: number) {
    const nextValue = clampProgressValue(value, minimum, this.settings.maximum);

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
  }

  private clearAnimationTimer() {
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.animationTimer = undefined;
    }
  }

  private getRenderEasing() {
    return this.renderEasingOverride ?? this.settings.easing;
  }

  private getRenderSpeed() {
    return this.renderSpeedOverride ?? this.settings.speed;
  }

  private pauseAnimation() {
    if (this.animation === null) {
      return;
    }

    this.animation.elapsed = Math.min(getNow() - this.animation.startedAt, this.animation.duration);
    this.clearAnimationTimer();
  }

  private resetRenderOverrides() {
    this.renderEasingOverride = null;
    this.renderSpeedOverride = null;
  }

  private resumeAnimation() {
    if (this.animation === null) {
      return;
    }

    this.animation.startedAt = getNow() - this.animation.elapsed;
    this.startAnimating();
  }

  private startAnimating() {
    if (this.animation === null) {
      return;
    }

    const tick = () => {
      this.animationTimer = undefined;

      if (this.isPaused || this.animation === null) {
        return;
      }

      const elapsed = Math.min(getNow() - this.animation.startedAt, this.animation.duration);
      const progressValue = Math.min(elapsed / this.animation.duration, 1);
      const easedValue = this.animation.easing(progressValue);
      const nextValue = this.animation.fromValue + (this.animation.toValue - this.animation.fromValue) * easedValue;

      this.animation.elapsed = elapsed;
      this.applyValue(progressValue >= 1 ? this.animation.toValue : nextValue, 0);

      if (progressValue >= 1) {
        this.animation = null;
        this.resetRenderOverrides();

        return;
      }

      this.animationTimer = setTimeout(tick, PROGRESS_ANIMATION_FRAME_DURATION);
    };

    this.animationTimer = setTimeout(tick, PROGRESS_ANIMATION_FRAME_DURATION);
  }

  private stopAnimation() {
    this.animation = null;
    this.clearAnimationTimer();
    this.resetRenderOverrides();
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
  animate: ProgressState.animate,
  configure: ProgressState.configure,
  reset: ProgressState.reset,
  isStarted: ProgressState.isStarted,
  isRendered: ProgressState.isRendered,
  set: ProgressState.set,
  start: ProgressState.start,
  stop: ProgressState.stop,
  done: ProgressState.done,
  inc: ProgressState.inc,
  dec: ProgressState.dec,
  trickle: ProgressState.trickle,
  promise: ProgressState.promise,
  remove: ProgressState.remove,
  pause: ProgressState.pause,
  resume: ProgressState.resume
});
