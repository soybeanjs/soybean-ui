import { onBeforeUnmount, watch } from 'vue';
import type { PopperV2RootContext } from './types';

export function usePopperV2Nesting(context: PopperV2RootContext): void {
  const { parent } = context;
  const unregister = parent?.registerChild(context);

  if (parent) {
    watch(
      parent.open,
      open => {
        if (!open) {
          context.onOpenChange(false, 'parent-close');
        }
      },
      { immediate: true }
    );
  }

  watch(
    context.open,
    open => {
      if (!open) {
        context.closeDescendants();
      }
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    context.closeDescendants();
    context.clearTimers();
    unregister?.();
  });
}
