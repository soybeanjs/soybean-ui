<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from 'reka-ui';
import { buttonVariants, cn } from '@soybean-ui/variants';
import type { ButtonProps } from './types';

defineOptions({
  name: 'SButton'
});

const { class: cls, color, variant, size, shape, shadow, fitContent, ...delegatedProps } = defineProps<ButtonProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => cn(buttonVariants({ color, variant, size, shape, shadow, fitContent }), cls));
</script>

<template>
  <button v-bind="forwardedProps" :class="mergedCls">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>

<style scoped></style>
