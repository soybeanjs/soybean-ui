import { ref } from 'vue';
import type { Ref } from 'vue';

/**
 * Options for {@link useSend}.
 */
export interface UseSendOptions {
  /** A callback invoked when a send is requested. May return an abort function. */
  sendHandler?: () => Promise<void> | void;
  /** A callback invoked when an abort is requested. */
  abortHandler?: () => void;
}

/**
 * The return value of {@link useSend}.
 */
export interface UseSendReturn {
  /** Whether a send is currently in flight. */
  loading: Ref<boolean>;
  /** Request a send (sets `loading` until the handler settles). */
  send: () => Promise<void>;
  /** Abort the current send. */
  abort: () => void;
  /** Finish a send manually and clear `loading`. */
  finish: () => void;
}

/**
 * Frontend "sending" state control.
 *
 * Wraps an optional send handler and tracks in-flight state. Useful for
 * buttons and voice toggles that need a busy state without coupling to a
 * specific transport.
 */
export function useSend(options: UseSendOptions = {}): UseSendReturn {
  const { sendHandler, abortHandler } = options;

  const loading = ref(false);

  const send = async (): Promise<void> => {
    if (loading.value) return;
    loading.value = true;
    try {
      await sendHandler?.();
    } finally {
      loading.value = false;
    }
  };

  const abort = (): void => {
    abortHandler?.();
    loading.value = false;
  };

  const finish = (): void => {
    loading.value = false;
  };

  return { loading, send, abort, finish };
}
