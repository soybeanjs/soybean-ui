import { defineComponent, h } from 'vue';
import { Slot } from '../slot';
import type { PrimitiveProps } from './types';

const SELF_CLOSING_TAGS = new Set(['area', 'input', 'img']);

export const Primitive = defineComponent<PrimitiveProps>(
  (props, { slots, attrs }) => {
    const asChild = props.as === 'template';
    if (asChild) {
      return () => h(Slot, attrs, { default: slots.default });
    }

    const isSingleHtmlTag = typeof props.as === 'string' && SELF_CLOSING_TAGS.has(props.as);

    if (isSingleHtmlTag) {
      return () => h(props.as!, attrs);
    }

    return () => h(props.as || 'div', attrs, { default: slots.default });
  },
  {
    name: 'Primitive',
    inheritAttrs: false,
    props: ['as']
  }
);
