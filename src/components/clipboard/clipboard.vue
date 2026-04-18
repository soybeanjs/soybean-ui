<script setup lang="ts">
import { computed } from 'vue';
import { Clipboard } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { clipboardVariants } from './variants';
import type { ClipboardEmits, ClipboardProps } from './types';

defineOptions({
  name: 'SClipboard'
});

const props = defineProps<ClipboardProps>();

const emit = defineEmits<ClipboardEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'variant', 'shape', 'fitContent']);

const cls = computed(() =>
  cn(
    clipboardVariants({
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
  <Clipboard
    v-bind="forwardedProps"
    :class="cls"
    @click="emit('click', $event)"
    @copied="emit('copied', $event)"
    @copy-error="emit('copyError', $event)"
  >
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
