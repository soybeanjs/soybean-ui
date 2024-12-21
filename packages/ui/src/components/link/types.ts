import type { RouterLinkProps } from 'vue-router';
import type {
  AnchorRel,
  AnchorTarget,
  HTMLAttributeReferrerPolicy,
  MaybeArray,
  PrimitiveProps
} from '@soybean-ui/primitive';

export interface AnchorLinkProps {
  href?: string;
  target?: AnchorTarget;
  rel?: AnchorRel;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  disabled?: boolean;
  onClick?: MaybeArray<(e: MouseEvent) => void | Promise<void>>;
  navigate?: (e: MouseEvent) => void;
  isExternal?: boolean;
}

export interface LinkProps extends AnchorLinkProps, Partial<RouterLinkProps> {}

export type LinkPropsWithPrimitive = LinkProps & PrimitiveProps;
