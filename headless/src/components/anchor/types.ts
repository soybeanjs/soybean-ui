import type { HTMLAttributes, ShallowRef } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { LinkProps } from '../link/types';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';

export type AnchorContainer = HTMLElement | Window;

export type AnchorHistoryMode = 'push' | 'replace';

export interface AnchorSection {
  href: string;
  top: number;
}

export interface AnchorItemData extends Pick<AnchorLinkProps, 'disabled' | 'href' | 'target'> {
  children?: AnchorItemData[];
  title?: string;
}

export interface AnchorRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  bounds?: number;
  dir?: Direction;
  getContainer?: () => AnchorContainer | null;
  getCurrentAnchor?: (activeHref: string) => string;
  modelValue?: string;
  offsetTop?: number;
  orientation?: DataOrientation;
  replace?: boolean;
  targetOffset?: number;
}

export type AnchorRootEmits = {
  'update:modelValue': [value: string];
  activeChange: [value: string];
  itemSelect: [event: MouseEvent, payload: { href: string }];
};

export interface AnchorLinkProps
  extends PrimitiveProps, Pick<LinkProps, 'disabled' | 'target'>, /** @vue-ignore */ HTMLAttributes {
  href: string;
}

export interface AnchorCompactItemProps extends /** @vue-ignore */ HTMLAttributes {
  modelValue?: string;
  item: AnchorItemData;
  linkProps?: AnchorLinkProps;
  indicatorProps?: HTMLAttributes;
  titleProps?: HTMLAttributes;
  subProps?: HTMLAttributes;
}

export interface AnchorCompactProps extends AnchorRootProps {
  items: AnchorItemData[];
  linkProps?: AnchorLinkProps;
  indicatorProps?: HTMLAttributes;
  titleProps?: HTMLAttributes;
  subProps?: HTMLAttributes;
}

export type AnchorCompactEmits = AnchorRootEmits;

export interface AnchorRootContextParams extends PropsToContext<AnchorRootProps, 'dir'> {
  activeHref: ShallowRef<string | undefined>;
  onLinkClick: (event: MouseEvent, payload: { href: string }) => void;
  registerLink: (href: string) => void;
  scrollTo: (href: string) => void;
  unregisterLink: (href: string) => void;
}

export type AnchorUiSlot = 'root' | 'link' | 'sub' | 'item' | 'indicator' | 'title';

export type AnchorUi = UiClass<AnchorUiSlot>;
