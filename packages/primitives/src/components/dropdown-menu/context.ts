import { ref } from 'vue';
import type { Ref } from 'vue';
import { useContext, useId } from '../../composables';
import type { DropdownMenuRootContext, DropdownMenuRootContextParams } from './types';

export const [provideDropdownMenuRootContext, injectDropdownMenuRootContext] = useContext(
  'DropdownMenuRoot',
  (params: DropdownMenuRootContextParams) => {
    const context: DropdownMenuRootContext = {
      ...params,
      triggerId: '',
      initTriggerId: () => {
        context.triggerId ||= useId(undefined, 'soybean-dropdown-menu-trigger');
      },
      contentId: '',
      initContentId: () => {
        context.contentId ||= useId(undefined, 'soybean-dropdown-menu-content');
      },
      triggerElement: ref<HTMLElement | undefined>(),
      setTriggerElement: (elRef: Ref<HTMLElement | undefined>) => {
        context.triggerElement = elRef;
      },
      onOpenChange: (value: boolean) => {
        context.open.value = value;
      },
      onOpenToggle: () => {
        context.open.value = !context.open.value;
      }
    };
    return context;
  }
);
