import type { ComputedRef, HTMLAttributes, Ref } from 'vue';
import type {
  PartialKeys,
  VirtualItem,
  Virtualizer,
  VirtualizerOptions as _VirtualizerOptions
} from '@tanstack/vue-virtual';
import type { PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive';

export interface VirtualizerOptions extends Omit<
  PartialKeys<
    _VirtualizerOptions<HTMLElement, Element>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn' | 'estimateSize'
  >,
  'count' | 'getScrollElement'
> {}

export interface VirtualizerRootProps<T extends Record<string, any> = Record<string, any>>
  extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The height of the virtualizer root
   */
  height: number | string;
  items: T[];
  options?: VirtualizerOptions;
  dynamic?: boolean;
}

export interface VirtualizerDynamicContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface VirtualizerContentProps extends /** @vue-ignore */ HTMLAttributes {
  dynamicContentProps?: VirtualizerDynamicContentProps;
}

export interface VirtualizerItemProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  data: VirtualItem;
  customStyle?: boolean;
}

export interface VirtualizerRootContextParams extends PropsToContext<VirtualizerRootProps, 'dynamic'> {
  virtualizer: Ref<Virtualizer<HTMLElement, Element>>;
  virtualItems: ComputedRef<VirtualItem[]>;
  contentStyle: ComputedRef<string>;
  isHorizontal: ComputedRef<boolean>;
  totalSize: ComputedRef<number>;
}
