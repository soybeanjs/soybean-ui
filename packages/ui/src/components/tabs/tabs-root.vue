<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { computed } from 'vue';
import { TabsRoot, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { StringOrNumber } from '@soybean-ui/primitive';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsRootEmits, TabsRootProps } from './types';

defineOptions({
  name: 'STabsRoot'
});

const { class: cls, orientation, ...delegatedProps } = defineProps<TabsRootProps<T>>();

const emit = defineEmits<TabsRootEmits<T>>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = tabsVariants({ orientation });

  return cn(root(), cls);
});
</script>

<template>
  <TabsRoot v-bind="forwardedProps" :class="mergedCls" :orientation>
    <slot />
  </TabsRoot>
</template>

<style scoped></style>
