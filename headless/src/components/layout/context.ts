import { useContext } from '../../composables';
import type { LayoutRootContextParams, LayoutThemeContextParams } from './types';

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

export const [provideLayoutThemeContext, useLayoutThemeContext] = useContext(
  'LayoutTheme',
  (params: LayoutThemeContextParams) => params
);
