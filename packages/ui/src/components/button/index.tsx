import { defineComponent } from 'vue';
import type { HTMLAttributes, SlotsType } from 'vue';
import { Primitive } from 'radix-vue';
import type { PrimitiveProps } from 'radix-vue';
import { LoaderCircle } from 'lucide-vue-next';
import { buttonVariants } from '@soybean-unify/ui-variants';
import type { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';

export interface ButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
}

type Slots = SlotsType<{
  default: () => any;
  before?: () => any;
  after?: () => any;
  loading?: () => any;
}>;

export const SuButton = defineComponent<ButtonProps, {}, string, Slots>(
  (props, { slots }) => {
    const LoadingIcon = slots.loading || (() => <LoaderCircle size={16} class="animate-spin" />);

    return () => (
      <Primitive
        as={props.as || 'button'}
        asChild={props.asChild}
        disabled={Boolean(props.disabled || props.loading)}
        class={cn(
          buttonVariants({ color: props.color, variant: props.variant, size: props.size, shape: props.shape }),
          props.class
        )}
      >
        {props.loading ? <LoadingIcon /> : slots.before?.()}
        {slots.default?.()}
        {slots.after?.()}
      </Primitive>
    );
  },
  {
    name: 'SuButton',
    props: ['as', 'asChild', 'class', 'color', 'variant', 'size', 'shape', 'disabled', 'loading']
  }
);
