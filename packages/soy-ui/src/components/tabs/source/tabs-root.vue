<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { computed } from 'vue';
import { TabsRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { StringOrNumber } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsRootEmits, TabsRootProps } from '../types';

defineOptions({
  name: 'STabsRoot'
});

const { class: cls, size, orientation, fill, ...delegatedProps } = defineProps<TabsRootProps<T>>();

const emit = defineEmits<TabsRootEmits<T>>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = tabsVariants({ size, orientation, fill });

  return cn(root(), cls);
});
</script>

<template>
  <TabsRoot v-bind="forwardedProps" :class="mergedCls" :orientation="orientation">
    <slot />
  </TabsRoot>
</template>
