import type { ComputedRef, Ref } from 'vue';
import type {
  PartialKeys,
  VirtualItem,
  Virtualizer,
  VirtualizerOptions as _VirtualizerOptions
} from '@tanstack/vue-virtual';
import type { BaseProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive';

/**
 * Type information for VirtualizerOptions.
 */
export interface VirtualizerOptions extends Omit<
  PartialKeys<
    _VirtualizerOptions<HTMLElement, Element>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn' | 'estimateSize'
  >,
  'count' | 'getScrollElement'
> {}

/**
 * Properties for the VirtualizerRoot component.
 */
export interface VirtualizerRootProps<T extends Record<string, any> = Record<string, any>>
  extends PrimitiveProps, BaseProps {
  /**
   * The height of the virtualizer root
   */
  height: number | string;
  /**
   * Items rendered by the component.
   */
  items: T[];
  /**
   * Options.
   */
  options?: VirtualizerOptions;
  /**
   * Whether dynamic.
   */
  dynamic?: boolean;
}

/**
 * Properties for the VirtualizerDynamicContent component.
 */
export interface VirtualizerDynamicContentProps extends BaseProps {}

/**
 * Properties for the VirtualizerContent component.
 */
export interface VirtualizerContentProps extends PrimitiveProps, BaseProps {
  /**
   * Properties forwarded to the dynamic content element.
   */
  dynamicContentProps?: VirtualizerDynamicContentProps;
}

/**
 * Properties for the VirtualizerItem component.
 */
export interface VirtualizerItemProps extends PrimitiveProps, BaseProps {
  /**
   * Data.
   */
  data: VirtualItem;
  /**
   * Whether custom style.
   */
  customStyle?: boolean;
}

/**
 * Parameters used to create the VirtualizerRoot context.
 */
export interface VirtualizerRootContextParams extends PropsToContext<VirtualizerRootProps, 'dynamic'> {
  /**
   * Virtualizer used by the component context.
   */
  virtualizer: Ref<Virtualizer<HTMLElement, Element>>;
  /**
   * Virtual items used by the component context.
   */
  virtualItems: ComputedRef<VirtualItem[]>;
  /**
   * Content style used by the component context.
   */
  contentStyle: ComputedRef<string>;
  /**
   * Whether the orientation is horizontal.
   */
  isHorizontal: ComputedRef<boolean>;
  /**
   * Total size used by the component context.
   */
  totalSize: ComputedRef<number>;
}
