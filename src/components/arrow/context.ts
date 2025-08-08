import type { ComputedRef } from 'vue';
import { useContext } from '../../composables';
import type { ClassValue } from '../../types';

export const [provideArrowThemeContext, useArrowThemeContext] = useContext(
  'ArrowTheme',
  (cls: ComputedRef<ClassValue>) => cls
);
