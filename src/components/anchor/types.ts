import type {
  AnchorCompactEmits,
  AnchorCompactProps,
  AnchorItemData,
  AnchorUiSlot,
} from '@soybeanjs/headless/anchor';
import type { ClassValue, UiClass } from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export type AnchorExtraUiSlot = Exclude<AnchorUiSlot, 'root' | 'link'>;

export type AnchorExtendedUi = UiClass<AnchorUiSlot>;

export interface AnchorProps extends AnchorCompactProps {
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<AnchorExtendedUi>;
  class?: ClassValue;
  sticky?: boolean;
}

export type AnchorEmits = AnchorCompactEmits;

export type { AnchorItemData } from '@soybeanjs/headless/anchor';
