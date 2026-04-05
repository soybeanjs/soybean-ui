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

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: undefined
});

const emit = defineEmits<ToggleEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'variant', 'size']);

const cls = computed(() => {
  const variants = toggleVariants({
    color: props.color,
    variant: props.variant,
    size: props.size,
    shape: props.shape
  });

  return cn(variants, props.class);
});
</script>

<template>
  <Toggle
    v-slot="slotProps"
    v-bind="forwardedProps"
    :class="cls"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot v-bind="slotProps" />
  </Toggle>
</template>
