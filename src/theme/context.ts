import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useContext } from '@soybeanjs/headless/composables';
import type { ThemeSize } from './types';

export const [provideSizeContext, useSizeContext] = useContext(
  'SizeContext',
  ($size: MaybeRefOrGetter<ThemeSize | undefined>) => {
    const size = computed(() => toValue($size) ?? 'md');

    return {
      size
    };
  }
);
