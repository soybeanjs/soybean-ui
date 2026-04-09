<script setup lang="ts">
import { computed } from 'vue';
import { ToolbarButton } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toolbarButtonVariants } from './variants';
import type { ToolbarButtonEmits, ToolbarButtonProps } from './types';

defineOptions({
  name: 'SToolbarButton'
});

const props = defineProps<ToolbarButtonProps>();

const emit = defineEmits<ToolbarButtonEmits>();

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() => cn(toolbarButtonVariants(), props.class));
</script>

<template>
  <ToolbarButton v-bind="forwardedProps" :class="cls" @click="emit('click', $event)">
    <slot />
  </ToolbarButton>
</template>
