<script setup lang="ts">
import { computed } from 'vue';
import { SwitchRoot, useForwardPropsEmits } from 'radix-vue';
import type { SwitchRootEmits } from 'radix-vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchRootProps } from './types';

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

<style scoped></style>
