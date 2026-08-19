import { useContext, useUiContext } from '../../composables';
import type { TreeSelectRootContext, TreeSelectUiSlot } from './types';

export const [provideTreeSelectRootContext, useTreeSelectRootContext] = useContext(
  'TreeSelectRoot',
  (context: TreeSelectRootContext) => context
);

export const [provideTreeSelectUi, useTreeSelectUi] = useUiContext<TreeSelectUiSlot>('TreeSelectUi');
