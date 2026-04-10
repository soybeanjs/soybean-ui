import type {
  AnchorLinkProps,
  AnchorRootEmits,
  AnchorRootProps,
  AnchorUiSlot,
  ClassValue,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';

export interface AnchorItemData extends Pick<AnchorLinkProps, 'disabled' | 'href' | 'target'> {
  children?: AnchorItemData[];
  title?: string;
}

export type AnchorExtraUiSlot = 'children' | 'indicator' | 'item';

export type AnchorExtendedUi = UiClass<AnchorUiSlot | AnchorExtraUiSlot>;

export interface AnchorProps extends AnchorRootProps {
  class?: ClassValue;
  color?: ThemeColor;
  items: AnchorItemData[];
  linkProps?: Omit<AnchorLinkProps, 'href'>;
  size?: ThemeSize;
  sticky?: boolean;
  ui?: Partial<AnchorExtendedUi>;
}

export type AnchorEmits = AnchorRootEmits;
