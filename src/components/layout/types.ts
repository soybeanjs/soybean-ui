import type {
  LayoutCompactProps,
  LayoutCompactEmits,
  LayoutCompactSlots,
  LayoutClassicCompactProps,
  LayoutClassicCompactEmits,
  LayoutClassicCompactSlots,
  LayoutUi,
  LayoutClassicUi,
  LayoutVariant,
  LayoutCollapsible,
  LayoutSide,
  LayoutClassicScrollBehavior
} from '@soybeanjs/headless/layout';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the layout component.
 */
export interface LayoutProps extends LayoutCompactProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<LayoutUi>;
}

/**
 * Events for the layout component.
 */
export type LayoutEmits = LayoutCompactEmits;

/**
 * Slots for the layout component.
 */
export type LayoutSlots = LayoutCompactSlots;

/**
 * Properties for the layout classic component.
 */
export interface LayoutClassicProps extends LayoutClassicCompactProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<LayoutClassicUi>;
}

/**
 * Events for the layout classic component.
 */
export type LayoutClassicEmits = LayoutClassicCompactEmits;

/**
 * Slots for the layout classic component.
 */
export type LayoutClassicSlots = LayoutClassicCompactSlots;

export type { LayoutVariant, LayoutCollapsible, LayoutSide, LayoutClassicScrollBehavior };
