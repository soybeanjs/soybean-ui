import type { VirtualizerContentProps, VirtualizerDynamicContentProps, VirtualizerRootProps } from '@headless';

export interface VirtualizerProps<T extends Record<string, any>> extends VirtualizerRootProps<T> {
  contentProps?: VirtualizerContentProps;
  dynamicContentProps?: VirtualizerDynamicContentProps;
}
