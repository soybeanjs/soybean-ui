import { useContext, useDirection } from '../../composables';
import type { TreeRootContextParams } from './types';

export const [provideTreeRootContext, useTreeRootContext] = useContext('TreeRoot', (params: TreeRootContextParams) => {
  const dir = useDirection(() => params.dir.value);

  return {
    ...params,
    dir
  };
});
