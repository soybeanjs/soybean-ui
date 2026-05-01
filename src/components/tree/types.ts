import type {
  MaybeArray,
  TreeItemData,
  TreeVirtualizerRootEmits,
  TreeVirtualizerRootProps,
  VirtualizerContentProps,
  VirtualizerDynamicContentProps
} from '@soybeanjs/headless';

/**
 * Props for the tree virtualizer component.
 */
export interface TreeVirtualizerProps<
  T extends TreeItemData,
  U extends MaybeArray<string> | undefined,
  M extends boolean
> extends TreeVirtualizerRootProps<T, U, M> {
  /**
   * Props forwarded to the content element.
   */
  contentProps?: VirtualizerContentProps;
  /**
   * Props forwarded to the dynamic content element.
   */
  dynamicContentProps?: VirtualizerDynamicContentProps;
}

/**
 * Emits for the tree virtualizer component.
 */
export type TreeVirtualizerEmits<M extends boolean | undefined> = TreeVirtualizerRootEmits<M>;
