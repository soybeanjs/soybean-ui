<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import { cn } from '@soybean-unify/ui-variants';
import SButton from './button.vue';
import type { ButtonIconProps } from './types';

defineOptions({
  name: 'SButtonIcon'
});

const props = withDefaults(defineProps<ButtonIconProps>(), {
  color: 'accent',
  variant: 'ghost',
  shape: 'square'
});

const delegatedProps = reactiveOmit(props, ['class']);

const forwarded = useForwardProps(delegatedProps);

const cls = computed(() => cn(props.fitContent ? 'size-fit p-1' : '', props.class));
</script>

<template>
  <SButton v-bind="forwarded" :class="cls">
    <slot></slot>
  </SButton>
</template>

<style scoped></style>
