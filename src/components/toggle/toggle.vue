<script setup lang="ts">
import { computed } from 'vue';
import { Toggle } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toggleVariants } from './variants';
import type { ToggleEmits, ToggleProps } from './types';

defineOptions({
  name: 'SToggle'
});

const props = defineProps<ToggleProps>();

const emit = defineEmits<ToggleEmits>();

const forwardedProps = useOmitProps(props, ['class', 'variant', 'size']);

const cls = computed(() => {
  const variants = toggleVariants({
    variant: props.variant,
    size: props.size
  });

  return cn(variants, props.class);
});
</script>

<template>
  <Toggle v-slot="slotProps" v-bind="forwardedProps" :class="cls" @update:model-value="emit('update:modelValue', $event)">
    <slot v-bind="slotProps" />
  </Toggle>
</template>
