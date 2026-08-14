import { onMounted, onScopeDispose, ref } from 'vue';
import type { Ref } from 'vue';

/**
 * Options for {@link useBubbleListScroll}.
 */
export interface UseBubbleListScrollOptions {
  /** Distance (px) from the bottom considered "at bottom". Defaults to `40`. */
  threshold?: number;
}

/**
 * The return value of {@link useBubbleListScroll}.
 */
export interface UseBubbleListScrollReturn {
  /** The scroll container element. */
  container: Ref<HTMLElement | null>;
  /** Whether the user is currently near the bottom. */
  atBottom: Ref<boolean>;
  /** Read the current distance (px) from the bottom. */
  distanceFromBottom: () => number;
  /** Scroll the container to the bottom. */
  scrollToBottom: () => void;
}

/**
 * Scroll container state for a chat message list.
 *
 * Tracks whether the container is near the bottom, driven by scroll events
 * (and an initial measure once mounted). The owning component decides when to
 * auto-follow on content growth by reading `atBottom` and calling
 * `scrollToBottom()`. SSR-safe (no-op until the container is mounted).
 */
export function useBubbleListScroll(options: UseBubbleListScrollOptions = {}): UseBubbleListScrollReturn {
  const { threshold = 40 } = options;

  const container = ref<HTMLElement | null>(null);
  const atBottom = ref(true);

  let handleScroll: (() => void) | null = null;
  let lastEl: HTMLElement | null = null;

  const distanceFromBottom = (): number => {
    const el = container.value;
    if (!el) return 0;
    return el.scrollHeight - el.scrollTop - el.clientHeight;
  };

  const update = (): void => {
    atBottom.value = distanceFromBottom() <= threshold;
  };

  const attach = (el: HTMLElement): void => {
    if (handleScroll && lastEl) lastEl.removeEventListener('scroll', handleScroll);
    handleScroll = () => update();
    el.addEventListener('scroll', handleScroll);
    lastEl = el;
    update();
  };

  onMounted(() => {
    if (container.value) attach(container.value);
  });

  const scrollToBottom = (): void => {
    const el = container.value;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    update();
  };

  onScopeDispose(() => {
    if (handleScroll && lastEl) lastEl.removeEventListener('scroll', handleScroll);
  });

  return { container, atBottom, distanceFromBottom, scrollToBottom };
}
