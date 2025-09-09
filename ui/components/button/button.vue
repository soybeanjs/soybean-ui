<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@headless';
import { useOmitProps } from '@headless/composables';
import { cn } from '@theme';
import { buttonVariants } from '@variants/button';
import { useButtonGroupContext } from './context';
import type { ButtonEmits, ButtonProps } from './types';

defineOptions({
  name: 'SButton'
});

const props = defineProps<ButtonProps>();

const emit = defineEmits<ButtonEmits>();

const buttonGroupContext = useButtonGroupContext();

const forwardedProps = useOmitProps(props, ['size', 'color', 'variant', 'shape', 'shadow', 'disabled']);

const cls = computed(() => {
  const { size, color, variant, shape, shadow, fitContent } = buttonGroupContext || {};

  const variants = buttonVariants({
    size: props.size || size?.value,
    color: props.color || color?.value,
    variant: props.variant || variant?.value,
    shape: props.shape || shape?.value,
    shadow: props.shadow || shadow?.value,
    fitContent: props.fitContent || fitContent?.value
  });

  return cn(variants, props.class);
});

const disabled = computed(() => props.disabled || buttonGroupContext?.disabled.value);
</script>

<template>
  <Button v-bind="forwardedProps" :class="cls" :disabled="disabled" @click="emit('click', $event)">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </Button>
</template>
