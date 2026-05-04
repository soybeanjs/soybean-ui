import type { HTMLAttributes, ShallowRef } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { LinkBaseProps } from '../link/types';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';

/**
 * Type information for the anchor container component.
 */
export type AnchorContainer = HTMLElement | Window;

/**
 * Type information for the anchor history mode component.
 */
export type AnchorHistoryMode = 'push' | 'replace';

/**
 * Type information for the anchor section component.
 */
export interface AnchorSection {
  /**
   * The link of anchor
   */
  href: string;
  /**
   * anchor top position
   */
  top: number;
}

/**
 * Properties for the anchor root component.
 */
export interface AnchorRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Bounds.
   */
  bounds?: number;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
  /**
   * Get container.
   */
  getContainer?: () => AnchorContainer | null;
  /**
   * Get current anchor.
   */
  getCurrentAnchor?: (activeHref: string) => string;
  /**
   * Current model value.
   */
  modelValue?: string;
  /**
   * Offset top.
   */
  offsetTop?: number;
  /**
   * Orientation of the component.
   */
  orientation?: DataOrientation;
  /**
   * Whether replace.
   */
  replace?: boolean;
  /**
   * Target offset.
   */
  targetOffset?: number;
}

/**
 * Events for the anchor root component.
 */
export type AnchorRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
  /**
   * Emitted when active change occurs.
   */
  activeChange: [value: string];
  /**
   * Emitted when item select occurs.
   */
  itemSelect: [event: MouseEvent, payload: { href: string }];
};

/**
 * Properties for the AnchorLink component.
 */
export interface AnchorLinkProps extends PrimitiveProps, LinkBaseProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The link of anchor
   */
  href: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Option data for the anchor component.
 */
export interface AnchorOptionData extends Pick<AnchorLinkProps, 'disabled' | 'href' | 'target'> {
  /**
   * Nested child items.
   */
  children?: AnchorOptionData[];
  /**
   * Title text rendered by the component.
   */
  title?: string;
}

/**
 * Properties for the anchor item compact component.
 */
export interface AnchorItemCompactProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Current model value.
   */
  modelValue?: string;
  /**
   * Current item data.
   */
  item: AnchorOptionData;
  /**
   * Properties forwarded to the link element.
   */
  linkProps?: AnchorLinkProps;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: HTMLAttributes;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: HTMLAttributes;
  /**
   * Properties forwarded to the sub element.
   */
  subProps?: HTMLAttributes;
}

/**
 * Properties for the anchor compact component.
 */
export interface AnchorCompactProps extends AnchorRootProps {
  /**
   * Items rendered by the component.
   */
  items: AnchorOptionData[];
  /**
   * Properties forwarded to the link element.
   */
  linkProps?: AnchorLinkProps;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: HTMLAttributes;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: HTMLAttributes;
  /**
   * Properties forwarded to the sub element.
   */
  subProps?: HTMLAttributes;
}

/**
 * Events for the anchor compact component.
 */
export type AnchorCompactEmits = AnchorRootEmits;

/**
 * Parameters used to create the anchor root context.
 */
export interface AnchorRootContextParams extends PropsToContext<AnchorRootProps, 'dir'> {
  /**
   * Active href used by the component context.
   */
  activeHref: ShallowRef<string | undefined>;
  /**
   * Callback invoked when the link click event fires.
   */
  onLinkClick: (event: MouseEvent, payload: { href: string }) => void;
  /**
   * Register link used by the component context.
   */
  registerLink: (href: string) => void;
  /**
   * Scroll to used by the component context.
   */
  scrollTo: (href: string) => void;
  /**
   * Unregister link used by the component context.
   */
  unregisterLink: (href: string) => void;
}

/**
 * Available UI slots for the anchor component.
 */
export type AnchorUiSlot = 'root' | 'link' | 'sub' | 'item' | 'indicator' | 'title';

/**
 * UI class overrides for the anchor component.
 */
export type AnchorUi = UiClass<AnchorUiSlot>;
