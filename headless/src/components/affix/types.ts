import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';

/**
 * Type information for the affix target component.
 */
export type AffixTarget = string | Window | HTMLElement | (() => HTMLElement);

/**
 * State values for the affix component.
 */
export type AffixState = 'fixed' | 'static';

/**
 * Props for the affix root component.
 */
export interface AffixRootProps extends /** @vue-ignore */ Omit<HTMLAttributes, 'onChange'> {
  /**
   * The offset from the top of the target container when the element becomes affixed.
   *
   * @defaultValue 0
   */
  offsetTop?: number;
  /**
   * The offset from the bottom of the target container when the element becomes affixed.
   */
  offsetBottom?: number;
  /**
   * The element that Affix listens to for scroll position updates.
   *
   * @defaultValue window
   */
  target?: AffixTarget | null;
}

/**
 * Emits for the affix root component.
 */
export type AffixRootEmits = {
  /**
   * Emitted when change occurs.
   */
  change: [affixed: boolean];
};

/**
 * Props for the affix placeholder component.
 */
export interface AffixPlaceholderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the affix content component.
 */
export interface AffixContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the affix compact component.
 */
export interface AffixCompactProps extends AffixRootProps {
  /**
   * Props forwarded to the placeholder element.
   */
  placeholderProps?: AffixPlaceholderProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: AffixContentProps;
}

/**
 * Emits for the affix compact component.
 */
export type AffixCompactEmits = AffixRootEmits;

/**
 * Context for the affix root component.
 */
export interface AffixRootContext {
  /**
   * Whether affixed.
   */
  affixed: ShallowRef<boolean>;
  /**
   * Affix style used by the component context.
   */
  affixStyle: ShallowRef<Record<string, string> | undefined>;
  /**
   * Placeholder style used by the component context.
   */
  placeholderStyle: ShallowRef<Record<string, string> | undefined>;
  /**
   * Data state used by the component context.
   */
  dataState: ComputedRef<AffixState>;
  /**
   * Update position used by the component context.
   */
  updatePosition: () => void;
}

/**
 * Available UI slots for the affix component.
 */
export type AffixUiSlot = 'root' | 'placeholder' | 'content';

/**
 * UI class overrides for the affix component.
 */
export type AffixUi = UiClass<AffixUiSlot>;
