import { computed, shallowRef, useId } from 'vue';
import { useContext, useForwardElement } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { DisclosureState } from '../../types';
import type { DialogRootContextParams, DialogThemeContextParams } from './types';

export const [provideDialogRootContext, useDialogRootContext] = useContext(
  'DialogRoot',
  (params: DialogRootContextParams) => {
    const [triggerElement, setTriggerElement] = useForwardElement();
    const [contentElement, setContentElement] = useForwardElement();

    const { open, modal } = params;

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };
    const onOpenToggle = () => {
      open.value = !open.value;
    };

    const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));

    const contentId = shallowRef('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-dialog-content-${useId()}`;
    };

    const titleId = shallowRef('');
    const initTitleId = () => {
      if (titleId.value) return;
      titleId.value = `soybean-dialog-title-${useId()}`;
    };

    const descriptionId = shallowRef('');
    const initDescriptionId = () => {
      if (descriptionId.value) return;
      descriptionId.value = `soybean-dialog-description-${useId()}`;
    };

    return {
      open,
      onOpenChange,
      onOpenToggle,
      modal,
      dataState,
      triggerElement,
      setTriggerElement,
      contentElement,
      setContentElement,
      contentId,
      initContentId,
      titleId,
      initTitleId,
      descriptionId,
      initDescriptionId
    };
  }
);

export const [provideDialogThemeContext, useDialogThemeContext] = useContext(
  'DialogTheme',
  (params: DialogThemeContextParams) => params
);
