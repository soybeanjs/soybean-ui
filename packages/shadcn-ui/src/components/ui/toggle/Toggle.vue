<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { type ToggleVariants, toggleVariants } from '.';

const props = withDefaults(
  defineProps<
    ToggleProps & {
      class?: HTMLAttributes['class'];
      variant?: ToggleVariants['variant'];
      size?: ToggleVariants['size'];
    }
  >(),
  {
    variant: 'default',
    size: 'default',
    disabled: false
  }
);

const emit = defineEmits<ToggleEmits>();

const delegatedProps = computed(() => {
  const { class: _, size: _s, variant: _v, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <Toggle v-bind="forwarded" :class="cn(toggleVariants({ variant, size }), props.class)">
    <slot />
  </Toggle>
</template>
