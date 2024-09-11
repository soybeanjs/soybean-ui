<script setup lang="ts">
import { cn, toggleVariants } from '@soybean-ui/variants';
import type { ToggleEmits } from 'radix-vue';
import { Toggle, useForwardPropsEmits } from 'radix-vue';
import { computedOmit } from '../../shared';
import type { ToggleProps } from './types';

defineOptions({
  name: 'SToggle'
});

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: 'ghost',
  size: 'md',
  disabled: false
});

const emit = defineEmits<ToggleEmits>();

const delegatedProps = computedOmit(props, ['class', 'size', 'variant']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <Toggle v-bind="forwarded" :class="cn(toggleVariants({ variant, size }), props.class)">
    <slot />
  </Toggle>
</template>

<style scoped></style>
