import { useContext, useUiContext } from '../../composables';
import { usePageTabsOperation } from './hooks';
import type { PageTabsUiSlot, PageTabsRootContextParams, PageTabsItemContextParams } from './types';

export const [providePageTabsRootContext, usePageTabsRootContext] = useContext(
  'PageTabsRoot',
  (params: PageTabsRootContextParams) => {
    const operations = usePageTabsOperation(params);

    return {
      ...params,
      operations
    };
  }
);

export const [providePageTabsItemContext, usePageTabsItemContext] = useContext(
  'PageTabsItem',
  (params: PageTabsItemContextParams) => params
);

export const [providePageTabsUi, usePageTabsUi] = useUiContext<PageTabsUiSlot>('PageTabsUi');
