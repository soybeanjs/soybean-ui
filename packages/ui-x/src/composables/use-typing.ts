import { computed, onScopeDispose, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

/**
 * The typing effect to apply.
 *
 * - `typing` reveals one character at a time.
 * - `fade-in` reveals tokens by opacity.
 */
export type TypingEffect = 'typing' | 'fade-in';

/**
 * Options for {@link useTyping}.
 */
export interface UseTypingOptions {
  /** The effect to apply. Defaults to `typing`. */
  effect?: TypingEffect;
  /** Characters revealed per tick. Defaults to `1`. */
  step?: number;
  /** Milliseconds between ticks. Defaults to `16`. */
  interval?: number;
  /** When `true`, keep the previously revealed prefix before animating. Defaults to `false`. */
  keepPrefix?: boolean;
}

/**
 * The return value of {@link useTyping}.
 */
export interface UseTypingReturn {
  /** The content revealed so far. */
  display: ComputedRef<string>;
  /** The current effect. */
  effect: Ref<TypingEffect>;
  /** The full target content. */
  content: Ref<string>;
  /** Start typing towards a target content string. */
  start: (target: string) => void;
  /** Cancel the ongoing animation. */
  cancel: () => void;
}

/**
 * A typewriter / fade-in text animation.
 *
 * Drives a timer that reveals `content` incrementally. It is framework-agnostic
 * (no DOM access) and can be composed into `SxBubble`'s `typing` prop.
 */
export function useTyping(options: UseTypingOptions = {}): UseTypingReturn {
  const effect = ref<TypingEffect>(options.effect ?? 'typing');
  const content = ref('');
  const visible = ref(0);

  let timer: ReturnType<typeof setInterval> | null = null;

  const display = computed(() => {
    if (effect.value === 'fade-in') {
      return visible.value >= content.value.length ? content.value : '';
    }
    return content.value.slice(0, visible.value);
  });

  const stop = (): void => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = (target: string): void => {
    stop();
    content.value = target;
    visible.value = options.keepPrefix ? Math.min(visible.value, target.length) : 0;

    const step = options.step ?? 1;
    const interval = options.interval ?? 16;

    timer = setInterval(() => {
      visible.value += step;
      if (visible.value >= content.value.length) stop();
    }, interval);
  };

  const cancel = (): void => {
    stop();
  };

  onScopeDispose(stop);

  return { display, effect, content, start, cancel };
}
