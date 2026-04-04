import { shallowRef } from 'vue';
import type { ShallowRef, VNode } from 'vue';
import { useContext, useUiContext } from '../../composables';
import type { SonnerToasterProps, SonnerToastOptions, SonnerToastT, SonnerUiSlot, UseSonnerReturn } from './types';

let toastsCounter = 0;
const serverSonnerToasts = shallowRef<SonnerToastT[]>([]);

function getSonnerToastsStore() {
  if (typeof window === 'undefined') {
    return serverSonnerToasts;
  }

  if (!window.__SoybeanUI_sonnerToasts) {
    window.__SoybeanUI_sonnerToasts = shallowRef<SonnerToastT[]>([]);
  }

  return window.__SoybeanUI_sonnerToasts;
}

export const sonnerToasts = getSonnerToastsStore();

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
  const existing = sonnerToasts.value.find(item => item.id === toast.id);

  if (existing) {
    sonnerToasts.value = sonnerToasts.value.map(item => (item.id === toast.id ? { ...item, ...toast } : item));
  } else {
    sonnerToasts.value = [toast, ...sonnerToasts.value];
  }

  return toast.id;
}

function dismissToast(id?: string | number): string | number | undefined {
  if (id === undefined) {
    sonnerToasts.value = sonnerToasts.value.map(toast => ({ ...toast, delete: true }));
    return undefined;
  }

  sonnerToasts.value = sonnerToasts.value.map(toast => (toast.id === id ? { ...toast, delete: true } : toast));

  return id;
}

function buildUseSonner(): UseSonnerReturn {
  const create = (title: SonnerToastT['title'], options: SonnerToastOptions = {}) => {
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
      loading?: string | VNode;
      success?: string | VNode | ((result: T) => string | VNode);
      error?: string | VNode | ((error: unknown) => string | VNode);
      description?: string | VNode;
      duration?: number;
    } = {}
  ) => {
    const id = create(data.loading ?? 'Loading...', {
      type: 'loading',
      duration: Number.POSITIVE_INFINITY
    });

    promise.then(result => {
      const successTitle = typeof data.success === 'function' ? data.success(result) : (data.success ?? 'Success');

      addOrUpdateToast(
        createToast(successTitle, {
          id,
          type: 'success',
          description: data.description,
          duration: data.duration
        })
      );
    });

    promise.catch(error => {
      const errorTitle = typeof data.error === 'function' ? data.error(error) : (data.error ?? 'Something went wrong');

      addOrUpdateToast(
        createToast(errorTitle, {
          id,
          type: 'error',
          description: data.description,
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

export function useSonner(): UseSonnerReturn {
  if (typeof window !== 'undefined' && window.__SoybeanUI_useSonner) {
    return window.__SoybeanUI_useSonner;
  }

  return globalSonner;
}

export const [provideSonnerContext, useSonnerContext] = useContext<SonnerToasterProps>('SonnerToaster');
export const [provideSonnerUi, useSonnerUi] = useUiContext<SonnerUiSlot>('SonnerUi');

declare global {
  interface Window {
    __SoybeanUI_sonnerToasts?: ShallowRef<SonnerToastT[]>;
    __SoybeanUI_useSonner?: UseSonnerReturn;
  }
}
