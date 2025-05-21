import { ref, useId } from 'vue';
import { useContext } from '../../composables';
import type { CollapsibleContextParams } from './types';

export const [provideCollapsibleContext, useCollapsibleContext] = useContext(
  'Collapsible',
  (params: CollapsibleContextParams) => {
    const { open, disabled, unmountOnHide } = params;

    const onOpenToggle = () => {
      if (disabled.value) return;
      open.value = !open.value;
    };

    const contentId = ref(useId());

    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = useId();
    };

    return {
      open,
      disabled,
      unmountOnHide,
      onOpenToggle,
      contentId,
      initContentId
    };
  }
);
