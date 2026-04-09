import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DataOrientation, Direction, PropsToContext, UiClass } from '../../types';

export type AnchorContainer = HTMLElement | Window;

export interface AnchorRootProps extends /** @vue-ignore */ HTMLAttributes {
  bounds?: number;
  dir?: Direction;
  getContainer?: () => AnchorContainer;
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

export interface AnchorLinkProps extends /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
  href: string;
  target?: string;
}

export interface AnchorRootContextParams extends PropsToContext<AnchorRootProps, 'dir'> {
  activeHref: ShallowRef<string | undefined>;
  onLinkClick: (event: MouseEvent, payload: { href: string }) => void;
  registerLink: (href: string) => void;
  scrollTo: (href: string) => void;
  unregisterLink: (href: string) => void;
}

export interface AnchorRootContext extends Omit<AnchorRootContextParams, 'dir'> {
  dir: ComputedRef<Direction>;
}

export type AnchorUiSlot = 'root' | 'link';

export type AnchorUi = UiClass<AnchorUiSlot>;
