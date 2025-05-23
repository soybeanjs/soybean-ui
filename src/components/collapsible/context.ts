import { computed, ref, useId } from 'vue';
import { useContext } from '../../composables';
import type { OpenState } from '../../types';
import type { CollapsibleRootContextParams } from './types';

export const [provideCollapsibleRootContext, useCollapsibleRootContext] = useContext(
  'CollapsibleRoot',
  (params: CollapsibleRootContextParams) => {
    const { open, disabled, unmountOnHide } = params;

    const onOpenToggle = () => {
      if (disabled.value) return;
      open.value = !open.value;
    };

    const contentId = ref('');

    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-collapsible-content-${useId()}`;
    };

    const dataDisabled = computed(() => (disabled.value ? '' : undefined));
    const dataState = computed<OpenState>(() => (open.value ? 'open' : 'closed'));

    return {
      open,
      disabled,
      unmountOnHide,
      onOpenToggle,
      contentId,
      initContentId,
      dataDisabled,
      dataState
    };
  }
);
