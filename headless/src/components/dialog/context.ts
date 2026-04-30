import { computed, shallowRef, useId, nextTick } from 'vue';
import { useContext, useForwardElement, useUiContext } from '../../composables';
import type { UseUiConsumer } from '../../composables';
import { getDisclosureState } from '../../shared';
import type { ClassValue, DisclosureState } from '../../types';
import type { DialogRootContextParams, DialogProviderContext, DialogCompactContext, DialogUiSlot } from './types';

export const [provideDialogRootContext, useDialogRootContext] = useContext(
  'DialogRoot',
  (params: DialogRootContextParams) => {
    const [overlayElement, setOverlayElement] = useForwardElement();
    const [triggerElement, setTriggerElement] = useForwardElement();
    const [popupElement, setPopupElement] = useForwardElement();
    const [cancelElement, setCancelElement] = useForwardElement();

    const { open } = params;

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };
    const onOpenToggle = () => {
      open.value = !open.value;
    };

    const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));

    const popupId = shallowRef('');
    const initPopupId = () => {
      if (popupId.value) return;
      popupId.value = `soybean-dialog-popup-${useId()}`;
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

    const focusCancel = async () => {
      await nextTick();

      cancelElement.value?.focus({
        preventScroll: true
      });
    };

    return {
      ...params,
      onOpenChange,
      onOpenToggle,
      dataState,
      overlayElement,
      setOverlayElement,
      triggerElement,
      setTriggerElement,
      popupElement,
      setPopupElement,
      cancelElement,
      setCancelElement,
      popupId,
      initPopupId,
      titleId,
      initTitleId,
      descriptionId,
      initDescriptionId,
      focusCancel
    };
  }
);

export const [provideDialogProviderContext, useDialogProviderContext] = useContext(
  'DialogProvider',
  (params: DialogProviderContext) => {
    const { dialogs } = params;

    const getCurrentDialog = (id: number | string) => dialogs.value.find(dialog => String(dialog.id) === String(id));

    return {
      dialogs,
      getCurrentDialog
    };
  }
);

export const [provideDialogCompactContext, useDialogCompactContext] = useContext(
  'DialogCompact',
  (params: DialogCompactContext) => {
    const { dialog } = params;

    return {
      dialog
    };
  }
);

export const [provideDialogUi, _useDialogUi] = useUiContext<DialogUiSlot>('DialogUi');

export const useDialogUi = ((slot?: DialogUiSlot) => {
  if (!slot) {
    return _useDialogUi();
  }

  const providerContext = useDialogCompactContext();

  const base = _useDialogUi(slot);

  const cls = computed(() => {
    const providerCls = providerContext?.dialog?.value?.ui?.[slot];

    return [base.value, providerCls].filter(Boolean).join(' ') as ClassValue;
  });

  return cls;
}) as UseUiConsumer<DialogUiSlot>;
