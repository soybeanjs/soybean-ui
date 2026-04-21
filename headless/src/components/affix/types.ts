import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';

export type AffixTarget = string | Window | HTMLElement | (() => HTMLElement);

export type AffixState = 'fixed' | 'static';

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

export interface AffixPlaceholderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AffixContentProps extends /** @vue-ignore */ HTMLAttributes {}

export type AffixRootEmits = {
  change: [affixed: boolean];
};

export interface AffixCompactProps extends AffixRootProps {
  placeholderProps?: AffixPlaceholderProps;
  contentProps?: AffixContentProps;
}

export type AffixCompactEmits = AffixRootEmits;

export interface AffixRootContext {
  affixed: ShallowRef<boolean>;
  affixStyle: ShallowRef<Record<string, string> | undefined>;
  placeholderStyle: ShallowRef<Record<string, string> | undefined>;
  dataState: ComputedRef<AffixState>;
  updatePosition: () => void;
}

export type AffixUiSlot = 'root' | 'placeholder' | 'content';

export type AffixUi = UiClass<AffixUiSlot>;

export interface AffixRootExposed {
  affixed: ShallowRef<boolean>;
  /**
   * Schedule a position update on the next animation frame.
   */
  updatePosition: () => void;
}
