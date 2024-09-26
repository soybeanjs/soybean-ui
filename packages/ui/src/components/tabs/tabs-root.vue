<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { computed } from 'vue';
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';
import type { TabsRootEmits } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { StringOrNumber } from '../../types';
import type { TabsRootProps } from './types';

defineOptions({
  name: 'TabsRoot'
});

const { class: cls, ...delegatedProps } = defineProps<TabsRootProps<T>>();

const emit = defineEmits<TabsRootEmits<T>>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = tabsVariants();

  return cn(root(), cls);
});
</script>

<template>
  <TabsRoot v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsRoot>
</template>

<style scoped></style>
