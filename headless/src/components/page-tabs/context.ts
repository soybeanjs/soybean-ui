import { useContext, useUiContext } from '../../composables';
import type { PageTabsUiSlot, PageTabsRootContextParams, PageTabsItemContextParams } from './types';

export const [providePageTabsRootContext, usePageTabsRootContext] = useContext(
  'PageTabsRoot',
  (params: PageTabsRootContextParams) => params
);

export const [providePageTabsItemContext, usePageTabsItemContext] = useContext(
  'PageTabsItem',
  (params: PageTabsItemContextParams) => params
);

export const [providePageTabsUi, usePageTabsUi] = useUiContext<PageTabsUiSlot>('PageTabsUi');
