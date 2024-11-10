<script setup lang="ts">
import { computed } from 'vue';
import { SwitchRoot, useForwardProps } from 'radix-vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchRootEmits, SwitchRootProps } from './types';

defineOptions({
  name: 'SSwitchRoot'
});

const { class: cls, color, size, modelValue, ...delegatedProps } = defineProps<SwitchRootProps>();

const emit = defineEmits<SwitchRootEmits>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { root } = switchVariants({ color, size });

  return cn(root(), cls);
});
</script>

<template>
  <SwitchRoot
    v-bind="forwardedProps"
    :checked="modelValue"
    :class="mergedCls"
    @update:checked="emit('update:modelValue', $event)"
  >
    <slot />
  </SwitchRoot>
</template>

<style scoped></style>
