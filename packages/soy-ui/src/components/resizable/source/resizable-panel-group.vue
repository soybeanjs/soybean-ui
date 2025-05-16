<script setup lang="ts">
import { computed } from 'vue';
import { SplitterGroup, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, resizableVariants } from '@soybean-ui/variants';
import type { ResizablePanelGroupEmits, ResizablePanelGroupProps } from '../types';

defineOptions({
  name: 'SResizablePanelGroup'
});

const { class: cls, size, ...delegatedProps } = defineProps<ResizablePanelGroupProps>();

const emit = defineEmits<ResizablePanelGroupEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { panelGroup } = resizableVariants({ size });

  return cn(panelGroup(), cls);
});
</script>

<template>
  <SplitterGroup v-bind="forwarded" :class="mergedCls">
    <slot />
  </SplitterGroup>
</template>
