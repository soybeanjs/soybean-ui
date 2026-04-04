import { shallowRef } from 'vue';
import { useContext, useUiContext } from '../../composables';
import type { SonnerToasterProps, SonnerToastOptions, SonnerToastT, SonnerUiSlot, UseSonnerReturn } from './types';

// ─── Module-level singleton state ───────────────────────────────────────────

let toastsCounter = 0;

/** Reactive global list of sonner toasts. All `<SSonner>` instances subscribe to this. */
export const sonnerToasts = shallowRef<SonnerToastT[]>([]);

function createToast(title: SonnerToastT['title'], options: SonnerToastOptions = {}): SonnerToastT {
  const id = options.id ?? ++toastsCounter;

  return {
    id,
    title,
    createdAt: Date.now(),
    dismissible: true,
    ...options
  };
}

function addOrUpdateToast(toast: SonnerToastT): string | number {
  const existing = sonnerToasts.value.find(t => t.id === toast.id);

  if (existing) {
    sonnerToasts.value = sonnerToasts.value.map(t => (t.id === toast.id ? { ...t, ...toast } : t));
  } else {
    sonnerToasts.value = [toast, ...sonnerToasts.value];
  }

  return toast.id;
}

function dismissToast(id?: string | number): string | number | undefined {
  if (id === undefined) {
    sonnerToasts.value = sonnerToasts.value.map(t => ({ ...t, delete: true }));
    return undefined;
  }

  sonnerToasts.value = sonnerToasts.value.map(t => (t.id === id ? { ...t, delete: true } : t));
  return id;
}

// ─── Public `useSonner` factory ──────────────────────────────────────────────

function buildUseSonner(): UseSonnerReturn {
  const create = (title: SonnerToastT['title'], options: SonnerToastOptions = {}): string | number => {
    return addOrUpdateToast(createToast(title, options));
  };

  const sonner = create as UseSonnerReturn;

  sonner.success = (title, options = {}) => create(title, { ...options, type: 'success' });
  sonner.error = (title, options = {}) => create(title, { ...options, type: 'error' });
  sonner.info = (title, options = {}) => create(title, { ...options, type: 'info' });
  sonner.warning = (title, options = {}) => create(title, { ...options, type: 'warning' });
  sonner.loading = (title, options = {}) => create(title, { ...options, type: 'loading' });

  sonner.promise = <T>(
    promise: Promise<T>,
    data: {
      loading?: SonnerToastT['title'];
      success?: SonnerToastT['title'] | ((d: T) => SonnerToastT['title']);
      error?: SonnerToastT['title'] | ((e: unknown) => SonnerToastT['title']);
      description?: SonnerToastT['description'];
      duration?: number;
    } = {}
  ) => {
    const id = create(data.loading ?? 'Loading...', { type: 'loading', duration: Number.POSITIVE_INFINITY });

    promise.then(result => {
      const successMsg = typeof data.success === 'function' ? (data.success as (d: T) => SonnerToastT['title'])(result) : (data.success ?? 'Success');

      addOrUpdateToast(
        createToast(successMsg, {
          id,
          type: 'success',
          description: data.description,
          duration: data.duration
        })
      );
    });

    promise.catch(err => {
      const errorMsg = typeof data.error === 'function' ? (data.error as (e: unknown) => SonnerToastT['title'])(err) : (data.error ?? 'Something went wrong');

      addOrUpdateToast(
        createToast(errorMsg, {
          id,
          type: 'error',
          duration: data.duration
        })
      );
    });

    return id;
  };

  sonner.dismiss = dismissToast;

  return sonner;
}

const globalSonner = buildUseSonner();

// ─── Public composable ───────────────────────────────────────────────────────

/**
 * Returns the global sonner toast creator.
 *
 * Can be called outside of setup() because it reads from module-level state.
 */
export function useSonner(): UseSonnerReturn {
  if (typeof window !== 'undefined' && window.__SoybeanUI_useSonner) {
    return window.__SoybeanUI_useSonner;
  }

  return globalSonner;
}

// ─── Context pairs ───────────────────────────────────────────────────────────

export const [provideSonnerContext, useSonnerContext] = useContext<SonnerToasterProps>('SonnerToaster');

export const [provideSonnerUi, useSonnerUi] = useUiContext<SonnerUiSlot>('SonnerUi');
