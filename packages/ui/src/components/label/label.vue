<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '@soybeanjs/headless/label';
import { labelVariants } from '@/styles/label';
import type { LabelProps } from './types';

defineOptions({
  name: 'SLabel'
});

const props = defineProps<LabelProps>();

const cls = computed(() => labelVariants({ size: props.size }, props.class));
</script>

<template>
  <Label :for="props.for" :class="cls">
    <slot />
  </Label>
</template>
