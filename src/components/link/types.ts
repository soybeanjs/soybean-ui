import type { HTMLAttributes } from 'vue';
import type { NuxtLinkProps } from 'nuxt/app';
import type { PrimitiveProps } from '../primitive/types';

export interface LinkProps extends PrimitiveProps, NuxtLinkProps, /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
  inactiveClass?: string;
}
