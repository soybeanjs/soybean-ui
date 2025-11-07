import type {
  MaybeArray,
  TreeItemData,
  TreeVirtualizerRootEmits,
  TreeVirtualizerRootProps,
  VirtualizerContentProps,
  VirtualizerDynamicContentProps
} from '@soybeanjs/headless';

export interface TreeVirtualizerProps<
  T extends TreeItemData,
  U extends MaybeArray<string> | undefined,
  M extends boolean
> extends TreeVirtualizerRootProps<T, U, M> {
  contentProps?: VirtualizerContentProps;
  dynamicContentProps?: VirtualizerDynamicContentProps;
}

export type TreeVirtualizerEmits<M extends boolean | undefined> = TreeVirtualizerRootEmits<M>;
