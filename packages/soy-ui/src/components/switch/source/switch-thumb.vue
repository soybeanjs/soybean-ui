<script setup lang="ts">
import { computed } from 'vue';
import { SwitchThumb } from '@soybean-ui/primitives';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchThumbProps } from '../types';

defineOptions({
  name: 'SSwitchThumb'
});

const { class: cls, size } = defineProps<SwitchThumbProps>();

const mergedCls = computed(() => {
  const { thumb } = switchVariants({ size });

  return cn(thumb(), cls);
});
</script>

<template>
  <SwitchThumb :class="mergedCls">
    <slot />
  </SwitchThumb>
</template>
