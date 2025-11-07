import type { HTMLAttributes } from 'vue';

export interface TagProps extends /** @vue-ignore */ HTMLAttributes {
  open?: boolean;
}

export type TagEmits = {
  'update:open': [open: boolean];
};
