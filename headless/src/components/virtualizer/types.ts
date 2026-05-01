import type { ComputedRef, HTMLAttributes, Ref } from 'vue';
import type {
  PartialKeys,
  VirtualItem,
  Virtualizer,
  VirtualizerOptions as _VirtualizerOptions
} from '@tanstack/vue-virtual';
import type { PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive';

/**
 * Type information for the virtualizer options component.
 */
export interface VirtualizerOptions extends Omit<
  PartialKeys<
    _VirtualizerOptions<HTMLElement, Element>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn' | 'estimateSize'
  >,
  'count' | 'getScrollElement'
> {}

/**
 * Props for the virtualizer root component.
 */
export interface VirtualizerRootProps<T extends Record<string, any> = Record<string, any>>
  extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
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
 * Props for the virtualizer dynamic content component.
 */
export interface VirtualizerDynamicContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the virtualizer content component.
 */
export interface VirtualizerContentProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Props forwarded to the dynamic content element.
   */
  dynamicContentProps?: VirtualizerDynamicContentProps;
}

/**
 * Props for the virtualizer item component.
 */
export interface VirtualizerItemProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
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
 * Parameters used to create the virtualizer root context.
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
