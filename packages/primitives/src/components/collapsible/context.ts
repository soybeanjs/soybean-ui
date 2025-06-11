import { computed, ref } from 'vue';
import { useContext, useId } from '../../composables';
import type { CollapsibleRootContext, CollapsibleRootContextParams } from './types';

export const [provideCollapsibleRootContext, injectCollapsibleRootContext] = useContext(
  'CollapsibleRoot',
  (params: CollapsibleRootContextParams) => {
    const context: CollapsibleRootContext = {
      ...params,
      contentId: ref(''),
      dataState: computed(() => (params.open.value ? 'open' : 'closed')),
      dataDisabled: computed(() => (params.disabled?.value ? '' : undefined)),
      onOpenToggle: () => {
        if (params.disabled?.value) return;

        params.open.value = !params.open.value;
      },
      initContentId: () => {
        context.contentId.value ||= useId(undefined, 'soybean-collapsible-content');
      }
    };

    return context;
  }
);
