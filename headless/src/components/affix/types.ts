import type { HTMLAttributes, ShallowRef } from 'vue';

export type AffixTargetElement = Window | HTMLElement | null;

export type AffixTarget = () => AffixTargetElement;

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
  target?: AffixTarget;
}

export type AffixRootEmits = {
  change: [affixed: boolean];
};

export interface AffixRootExposed {
  affixed: ShallowRef<boolean>;
  /**
   * Schedule a position update on the next animation frame.
   */
  updatePosition: () => void;
}
