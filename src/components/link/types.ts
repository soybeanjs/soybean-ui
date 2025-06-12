import type { HTMLAttributes } from 'vue';
import type { NuxtLinkProps } from 'nuxt/app';
import type { PrimitiveProps } from '../primitive/types';

export interface LinkProps<CustomProp extends boolean = false>
  extends PrimitiveProps,
    NuxtLinkProps<CustomProp>,
    /** @vue-ignore */ HTMLAttributes {}
