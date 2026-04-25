import type {
  ClassValue,
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
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface LayoutProps extends LayoutCompactProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<LayoutUi>;
}

export type LayoutEmits = LayoutCompactEmits;

export type LayoutSlots = LayoutCompactSlots;

export interface LayoutClassicProps extends LayoutClassicCompactProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<LayoutClassicUi>;
}

export type LayoutClassicEmits = LayoutClassicCompactEmits;

export type LayoutClassicSlots = LayoutClassicCompactSlots;

export type { LayoutVariant, LayoutCollapsible, LayoutSide, LayoutClassicScrollBehavior };
