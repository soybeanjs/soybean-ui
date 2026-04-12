import type { HTMLAttributes } from 'vue';
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

export interface AnchorItemProps extends /** @vue-ignore */ HTMLAttributes {
  modelValue?: string;
  item: AnchorItemData;
  linkProps?: AnchorLinkProps;
  indicatorProps?: HTMLAttributes;
  titleProps?: HTMLAttributes;
  subProps?: HTMLAttributes;
}

export type AnchorExtraUiSlot = 'sub' | 'item' | 'indicator' | 'title';

export type AnchorExtendedUi = UiClass<AnchorUiSlot | AnchorExtraUiSlot>;

export interface AnchorProps extends AnchorRootProps {
  color?: ThemeColor;
  size?: ThemeSize;
  ui?: Partial<AnchorExtendedUi>;
  class?: ClassValue;
  items: AnchorItemData[];
  sticky?: boolean;
  linkProps?: AnchorLinkProps;
  indicatorProps?: HTMLAttributes;
  titleProps?: HTMLAttributes;
  subProps?: HTMLAttributes;
}

export type AnchorEmits = AnchorRootEmits;
