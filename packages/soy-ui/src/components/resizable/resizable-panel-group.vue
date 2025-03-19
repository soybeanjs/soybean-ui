<script setup lang="ts">
import { computed } from 'vue';
import { SplitterGroup, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, resizableVariants } from '@soybean-ui/variants';
import type { ResizablePanelGroupEmits, ResizablePanelGroupProps } from './types';

defineOptions({
  name: 'SResizablePanelGroup'
});

const { class: cls, ...delegatedProps } = defineProps<ResizablePanelGroupProps>();

const emit = defineEmits<ResizablePanelGroupEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { panelGroup } = resizableVariants();

const mergedCls = computed(() => cn(panelGroup(), cls));
</script>

<template>
  <SplitterGroup v-bind="forwarded" :class="mergedCls">
    <slot />
  </SplitterGroup>
</template>
