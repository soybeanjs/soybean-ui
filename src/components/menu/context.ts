import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { provideMenuUi as _provideMenuUi } from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import { menuVariants } from '../menu/variants';
import { kbdVariants } from '../kbd/variants';
import type { MenuUiBaseProps } from './types';

export const provideMenuUi = (options: MaybeRefOrGetter<MenuUiBaseProps>) => {
  const ui = computed(() => {
    const props = toValue(options);

    const variants = menuVariants({
      size: props.size,
      indicatorPosition: props.indicatorPosition
    });

    const kbd = kbdVariants({
      size: props.size
    });

    const shortcut = variants.shortcut;

    variants.shortcut = () => `${shortcut()} ${kbd}`;

    return mergeSlotVariants(variants, props.ui, { popup: props.class });
  });

  _provideMenuUi(ui);
};
