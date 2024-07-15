import { defineComponent } from 'vue';
import type { HTMLAttributes, SlotsType } from 'vue';
import { Primitive } from 'radix-vue';
import type { PrimitiveProps } from 'radix-vue';
import { buttonVariants } from '@soybean-unify/ui-variants';
import type { ButtonColor, ButtonSize, ButtonVariant } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';

export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type Slots = SlotsType<{
  default: () => void;
  before?: () => void;
  after?: () => void;
}>;

export const SuButton = defineComponent<ButtonProps, {}, string, Slots>(
  (props, { slots }) => {
    return () => (
      <Primitive
        as={props.as || 'button'}
        asChild={props.asChild}
        class={cn(buttonVariants({ color: props.color, variant: props.variant, size: props.size }), props.class)}
      >
        {slots.before?.()}
        {slots.default?.()}
        {slots.after?.()}
      </Primitive>
    );
  },
  {
    name: 'SuButton',
    props: ['as', 'asChild', 'class', 'color', 'variant', 'size']
  }
);
