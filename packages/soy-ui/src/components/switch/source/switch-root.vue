<script setup lang="ts">
import { computed } from 'vue';
import { SwitchRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchRootEmits, SwitchRootProps } from '../types';

defineOptions({
  name: 'SSwitchRoot'
});

const { class: cls, color, size, ...delegatedProps } = defineProps<SwitchRootProps>();

const emit = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = switchVariants({ color, size });

  return cn(root(), cls);
});
</script>

<template>
  <SwitchRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </SwitchRoot>
</template>
