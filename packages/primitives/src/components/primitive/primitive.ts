import { defineComponent, h } from 'vue';
import type { DefaultSlots, PrimitiveProps } from '../../types';
import { Slot } from './slot';

export const Primitive = defineComponent<PrimitiveProps, {}, string, DefaultSlots>(
  (props, { attrs, slots }) => {
    const asTag = props.asChild ? 'template' : props.as;

    // For self closing tags, don't provide default slots because of hydration issue
    const SELF_CLOSING_TAGS = ['area', 'img', 'input'];

    if (typeof asTag === 'string' && SELF_CLOSING_TAGS.includes(asTag)) {
      return () => h(asTag, attrs);
    }

    if (asTag !== 'template') {
      return () => h(props.as || 'div', attrs, { default: slots.default });
    }

    return () => h(Slot, attrs, { default: slots.default });
  },
  {
    name: 'Primitive',
    inheritAttrs: false,
    props: ['asChild', 'as'],
    slots: {}
  }
);

export default Primitive;
