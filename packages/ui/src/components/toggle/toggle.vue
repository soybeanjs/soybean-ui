<script setup lang="ts">
import { Toggle, useForwardPropsEmits } from 'radix-vue';
import type { ToggleEmits } from 'radix-vue';
import { cn, toggleVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { ToggleProps } from './types';

defineOptions({
  name: 'SToggle'
});

const props = defineProps<ToggleProps>();

const emit = defineEmits<ToggleEmits>();

const delegatedProps = computedOmit(props, ['class', 'variant', 'size']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <Toggle v-bind="forwarded" :class="cn(toggleVariants({ variant, size }), props.class)">
    <slot />
  </Toggle>
</template>

<style scoped></style>
