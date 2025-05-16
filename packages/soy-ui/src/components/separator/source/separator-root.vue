<script setup lang="ts">
import { computed } from 'vue';
import { Separator } from '@soybean-ui/primitives';
import { cn, separatorVariants } from '@soybean-ui/variants';
import type { SeparatorRootProps } from '../types';

defineOptions({
  name: 'SSeparatorRoot'
});

const { class: cls, border, decorative, orientation } = defineProps<SeparatorRootProps>();

const mergedCls = computed(() => {
  const { root } = separatorVariants({ orientation, border });

  return cn(root(), cls);
});
</script>

<template>
  <Separator :class="mergedCls" :decorative="decorative" :orientation="orientation">
    <slot />
  </Separator>
</template>
