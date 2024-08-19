<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { Label } from 'radix-vue';
import { cn, labelVariants } from '@soybean-unify/ui-variants';
import type { LabelProps } from './types';

defineOptions({
  name: 'SLabel'
});

const props = defineProps<LabelProps>();

const delegatedProps = reactiveOmit(props, ['class']);
</script>

<template>
  <Label v-bind="delegatedProps" :class="cn(labelVariants(), props.class)">
    <slot />
  </Label>
</template>
