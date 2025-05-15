<script setup lang="ts">
import { computed } from 'vue';
import { Toggle, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, toggleVariants } from '@soybean-ui/variants';
import type { ToggleEmits, ToggleProps } from '../types';

defineOptions({
  name: 'SToggle'
});

const { class: cls, variant, size, ...delegatedProps } = defineProps<ToggleProps>();

const emit = defineEmits<ToggleEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { toggle } = toggleVariants({ variant, size });

  return cn(toggle(), cls);
});
</script>

<template>
  <Toggle v-bind="forwarded" :class="mergedCls">
    <slot />
  </Toggle>
</template>
