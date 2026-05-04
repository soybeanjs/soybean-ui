import { VirtualizerContentProps, VirtualizerDynamicContentProps } from '@soybeanjs/headless/virtualizer';
import type { TreeItemData, TreeVirtualizerRootEmits, TreeVirtualizerRootProps } from '@soybeanjs/headless/tree';
import type { MaybeArray } from '@soybeanjs/headless/types';

/**
 * Properties for the tree virtualizer component.
 */
export interface TreeVirtualizerProps<
  T extends TreeItemData,
  U extends MaybeArray<string> | undefined,
  M extends boolean
> extends TreeVirtualizerRootProps<T, U, M> {
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: VirtualizerContentProps;
  /**
   * Properties forwarded to the dynamic content element.
   */
  dynamicContentProps?: VirtualizerDynamicContentProps;
}

/**
 * Events for the tree virtualizer component.
 */
export type TreeVirtualizerEmits<M extends boolean | undefined> = TreeVirtualizerRootEmits<M>;
