<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '@soybean-ui/primitives';
import { cn, labelVariants } from '@soybean-ui/variants';
import type { LabelProps } from '../types';

defineOptions({
  name: 'SLabel'
});

const { class: cls, size, for: forId } = defineProps<LabelProps>();

const mergedCls = computed(() => cn(labelVariants({ size }), cls));
</script>

<template>
  <Label :for="forId" :class="mergedCls">
    <slot />
  </Label>
</template>
