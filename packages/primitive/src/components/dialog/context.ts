import { computed, ref } from 'vue';
import { useContext, useId } from '../../composables';
import type { DialogRootContext, DialogRootContextParams } from './types';

export const [provideDialogRootContext, injectDialogRootContext] = useContext(
  'DialogRoot',
  (params: DialogRootContextParams) => {
    const context: DialogRootContext = {
      ...params,
      dataState: computed(() => (params.open.value ? 'open' : 'closed')),
      openModal: () => {
        params.open.value = true;
      },
      onOpenChange: value => {
        params.open.value = value;
      },
      onOpenToggle: () => {
        params.open.value = !params.open.value;
      },
      titleId: ref(''),
      initTitleId: () => {
        context.titleId.value ||= useId(undefined, 'soybean-dialog-title');
      },
      descriptionId: ref(''),
      initDescriptionId: () => {
        context.descriptionId.value ||= useId(undefined, 'soybean-dialog-description');
      },
      contentId: ref(''),
      initContentId: () => {
        context.contentId.value ||= useId(undefined, 'soybean-dialog-content');
      }
    };

    return context;
  }
);
