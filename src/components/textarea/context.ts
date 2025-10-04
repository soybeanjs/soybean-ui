import { useContext } from '../../composables';
import type { TextareaRootContextParams, TextareaThemeContextParams } from './types';

export const [provideTextareaRootContext, useTextareaRootContext] = useContext(
  'TextareaRoot',
  (params: TextareaRootContextParams) => params
);

export const [provideTextareaThemeContext, useTextareaThemeContext] = useContext(
  'TextareaTheme',
  (params: TextareaThemeContextParams) => params
);
