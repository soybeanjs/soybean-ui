import type {
  VirtualizerContentProps,
  VirtualizerDynamicContentProps,
  VirtualizerRootProps
} from '@soybeanjs/headless';

/**
 * Props for the virtualizer component.
 */
export interface VirtualizerProps<T extends Record<string, any>> extends VirtualizerRootProps<T> {
  /**
   * Props forwarded to the content element.
   */
  contentProps?: VirtualizerContentProps;
  /**
   * Props forwarded to the dynamic content element.
   */
  dynamicContentProps?: VirtualizerDynamicContentProps;
}
