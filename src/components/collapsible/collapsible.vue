<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot, provideCollapsibleUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { collapsibleVariants } from '@/variants/collapsible';
import type { CollapsibleEmits, CollapsibleProps } from './types';

defineOptions({
  name: 'SCollapsible'
});

const props = withDefaults(defineProps<CollapsibleProps>(), {
  open: undefined,
  defaultOpen: false,
  unmountOnHide: true
});

const emit = defineEmits<CollapsibleEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const ui = computed(() => {
  const variants = collapsibleVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideCollapsibleUi(ui);
</script>

<template>
  <CollapsibleRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
