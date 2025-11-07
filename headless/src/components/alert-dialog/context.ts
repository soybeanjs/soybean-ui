import { nextTick } from 'vue';
import { useContext, useForwardElement } from '../../composables';

export const [provideAlertDialogContentContext, useAlertDialogContentContext] = useContext('AlertDialogContent', () => {
  const [cancelElement, setCancelElement] = useForwardElement();

  const focusCancel = async () => {
    await nextTick();

    cancelElement.value?.focus({
      preventScroll: true
    });
  };

  return {
    cancelElement,
    setCancelElement,
    focusCancel
  };
});
