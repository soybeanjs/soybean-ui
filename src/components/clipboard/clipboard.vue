<script setup lang="ts">
import { computed } from 'vue';
import { Clipboard } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { buttonVariants } from '../button/variants';
import type { ClipboardEmits, ClipboardProps } from './types';

defineOptions({
  name: 'SClipboard'
});

const props = defineProps<ClipboardProps>();

const emit = defineEmits<ClipboardEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'variant', 'shape', 'fitContent']);

const cls = computed(() =>
  cn(
    buttonVariants({
      color: props.color,
      size: props.size,
      variant: props.variant,
      shape: props.shape,
      fitContent: props.fitContent
    }),
    props.class
  )
);
</script>

<template>
  <Clipboard v-bind="forwardedProps" :class="cls" v-on="listeners">
    <template #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
    <template #trailing="slotProps">
      <slot name="trailing" v-bind="slotProps" />
    </template>
  </Clipboard>
</template>
