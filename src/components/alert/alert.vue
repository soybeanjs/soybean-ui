<script setup lang="ts">
import { computed } from 'vue';
import { AlertCompact, provideAlertUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { alertVariants } from './variants';
import type { AlertEmits, AlertProps } from './types';

defineOptions({
  name: 'SAlert'
});

const props = withDefaults(defineProps<AlertProps>(), {
  open: undefined
});

const emit = defineEmits<AlertEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'color', 'variant', 'ui']);

const handleOpenChange = (value: boolean) => {
  emit('update:open', value);
};

const ui = computed(() => {
  const variants = alertVariants({
    size: props.size,
    color: props.color,
    variant: props.variant
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAlertUi(ui);
</script>

<template>
  <AlertCompact v-bind="forwardedProps" @update:open="handleOpenChange">
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
    <slot />
    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
    <template v-if="$slots.close" #close>
      <slot name="close" />
    </template>
  </AlertCompact>
</template>
