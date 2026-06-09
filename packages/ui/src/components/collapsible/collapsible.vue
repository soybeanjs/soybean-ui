<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleRoot, provideCollapsibleUi } from '@soybeanjs/headless/collapsible';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { collapsibleVariants } from '@/styles/collapsible';
import type { CollapsibleProps, CollapsibleEmits } from './types';

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

const ui = computed(() => collapsibleVariants({ size: props.size }, props.ui));

provideCollapsibleUi(ui);
</script>

<template>
  <CollapsibleRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
