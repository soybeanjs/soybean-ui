import { useContext, useUiContext } from '../../composables';
import type {
  LayoutRootContextParams,
  LayoutCompactRootContextParams,
  LayoutUiSlot,
  LayoutClassicUiSlot
} from './types';

export const [provideLayoutRootContext, useLayoutRootContext] = useContext(
  'LayoutRoot',
  (params: LayoutRootContextParams) => {
    const { open, isMobile, mobileOpen } = params;

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };

    const onMobileOpenChange = (value: boolean) => {
      mobileOpen.value = value;
    };

    const toggleSidebar = () => {
      if (isMobile.value) {
        mobileOpen.value = !mobileOpen.value;
      } else {
        open.value = !open.value;
      }
    };

    return {
      ...params,
      onOpenChange,
      onMobileOpenChange,
      toggleSidebar
    };
  }
);

export const [provideLayoutClassicRootContext, useLayoutClassicRootContext] = useContext(
  'LayoutClassicRoot',
  (params: LayoutCompactRootContextParams) => {
    provideLayoutRootContext(params);

    return params;
  }
);

export const [provideLayoutUi, useLayoutUi] = useUiContext<LayoutUiSlot>('LayoutUi');

export const [provideLayoutClassicUi, useLayoutClassicUi] = useUiContext<LayoutClassicUiSlot>('LayoutClassicUi', ui => {
  provideLayoutUi(ui);

  return ui;
});
