import { useContext, useDirection } from '../../composables';
import type { TreeRootContextParams, TreeThemeContextParams } from './types';

export const [provideTreeRootContext, useTreeRootContext] = useContext('TreeRoot', (params: TreeRootContextParams) => {
  const dir = useDirection(() => params.dir.value);

  return {
    ...params,
    dir
  };
});

export const [provideTreeThemeContext, useTreeThemeContext] = useContext(
  'TreeTheme',
  (params: TreeThemeContextParams) => params
);
