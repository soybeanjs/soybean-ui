<script setup lang="ts">
import { computed } from 'vue';
import { checkboxVariants, cn } from '@soybean-ui/variants';
import type { CheckboxRootProps } from '../types';

defineOptions({
  name: 'SCheckboxRoot'
});

const { class: cls, size } = defineProps<CheckboxRootProps>();

const mergedCls = computed(() => {
  const { root } = checkboxVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
