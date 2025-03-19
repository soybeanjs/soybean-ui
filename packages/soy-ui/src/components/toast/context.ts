import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { useContext } from '@soybean-ui/primitives';
import type { Action, ToastContext, ToastContextParams, ToastReturn, ToastState } from './types';

export const [provideToastContext, injectToastContext] = useContext('ToastContext', (params: ToastContextParams) => {
  const toasts = ref([]) as Ref<ToastState[]>;

  const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

  let count = 0;

  function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
  }

  function addToast(toastState: ToastState) {
    toasts.value = [toastState, ...toasts.value].slice(0, params.value.toastLimit);
  }

  function updateToast(updateProps: Partial<ToastState>) {
    toasts.value = toasts.value.map(t => (t.id === updateProps.id ? { ...t, ...updateProps } : t));
  }

  function dismissToast(toastId?: string) {
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      toasts.value.forEach(item => addToRemoveQueue(item.id));
    }

    toasts.value = toasts.value.map(t =>
      t.id === toastId || toastId === undefined
        ? {
            ...t,
            open: false
          }
        : t
    );
  }

  function removeToast(toastId?: string) {
    if (toastId) {
      toasts.value = toasts.value.filter(t => t.id !== toastId);
    } else {
      toasts.value = [];
    }
  }

  function dispatch(action: Action) {
    switch (action.type) {
      case 'add':
        addToast(action.toast);
        break;
      case 'update':
        updateToast(action.toast);
        break;
      case 'dismiss':
        dismissToast(action.toastId);
        break;
      case 'remove':
        removeToast(action.toastId);
        break;
      default:
    }
  }

  function addToRemoveQueue(toastId: string) {
    if (toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
      toastTimeouts.delete(toastId);
      dispatch({
        type: 'remove',
        toastId
      });
    }, params.value.toastRemoveDelay);

    toastTimeouts.set(toastId, timeout);
  }

  function toast(props: Omit<ToastState, 'id'>) {
    const id = genId();

    const update = (updateProps: ToastState) =>
      dispatch({
        type: 'update',
        toast: { ...updateProps, id }
      });

    const dismiss = () => dispatch({ type: 'dismiss', toastId: id });

    dispatch({
      type: 'add',
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange(open: boolean) {
          if (!open) {
            dismiss();
          }
        }
      }
    });

    return {
      id,
      dismiss,
      update
    };
  }

  const context: ToastContext = {
    toasts,
    toastTimeouts,
    addToRemoveQueue: () => {},
    dispatch: () => {},
    toast
  };

  return context;
});

export interface UseToastReturn {
  toasts: ComputedRef<ToastState[]>;
  toast: (props: Omit<ToastState, 'id'>) => ToastReturn;
  dismiss: (toastId?: string) => void;
}

export function useToast(): UseToastReturn {
  const context = injectToastContext();

  if (!context) {
    throw new Error('ToastContext is not provided');
  }

  const { toasts, toast, dispatch } = context;

  return {
    toasts: computed(() => toasts.value),
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'dismiss', toastId })
  };
}
