import { computed, ref, useId } from 'vue';
import { useContext, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DisclosureState } from '../../types';
import type { DialogRootContextParams } from './types';

export const [provideDialogRootContext, useDialogRootContext] = useContext(
  'DialogRoot',
  (params: DialogRootContextParams) => {
    const [triggerElement, setTriggerElement] = useForwardElement();
    const [contentElement, setContentElement] = useForwardElement();

    const { open, modal } = params;

    const openModal = () => {
      open.value = true;
    };
    const closeModal = () => {
      open.value = false;
    };
    const onOpenChange = (value: boolean) => {
      open.value = value;
    };
    const onOpenToggle = () => {
      open.value = !open.value;
    };

    const contentId = ref('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-dialog-content-${useId()}`;
    };

    const titleId = ref('');
    const initTitleId = () => {
      if (titleId.value) return;
      titleId.value = `soybean-dialog-title-${useId()}`;
    };

    const descriptionId = ref('');
    const initDescriptionId = () => {
      if (descriptionId.value) return;
      descriptionId.value = `soybean-dialog-description-${useId()}`;
    };

    const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));

    return {
      open,
      modal,
      openModal,
      closeModal,
      onOpenChange,
      onOpenToggle,
      dataState,
      triggerElement,
      setTriggerElement,
      contentElement,
      setContentElement,
      contentId,
      titleId,
      descriptionId,
      initContentId,
      initTitleId,
      initDescriptionId
    };
  }
);
