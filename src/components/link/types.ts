import type { HTMLAttributes } from 'vue';
import type { NuxtLinkProps } from 'nuxt/app';
import type { PrimitiveProps } from '../primitive/types';

export interface LinkProps
  extends PrimitiveProps,
    Omit<NuxtLinkProps<boolean>, 'custom'>,
    /** @vue-ignore */ HTMLAttributes {
  disabled?: boolean;
  inactiveClass?: string;
}
