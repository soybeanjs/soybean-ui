<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, radioVariants } from '@soybean-ui/variants';
import type { RadioRootProps } from './types';

defineOptions({
  name: 'SRadioRoot'
});

const { class: cls } = defineProps<RadioRootProps>();

const { root } = radioVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
