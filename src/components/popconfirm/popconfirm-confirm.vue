<script setup lang="ts">
import { computed } from 'vue';
import { PopconfirmConfirm } from '@soybeanjs/headless/popconfirm';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { usePopconfirmContext } from './context';
import { resolvePopconfirmButtonVariants } from './shared';
import type { PopconfirmConfirmProps, PopconfirmConfirmEmits } from './types';

defineOptions({
  name: 'SPopconfirmConfirm'
});

const props = defineProps<PopconfirmConfirmProps>();

const emit = defineEmits<PopconfirmConfirmEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'fitContent', 'shadow', 'shape', 'size', 'variant']);

const { size } = usePopconfirmContext('PopconfirmConfirm');

const cls = computed(() => cn(resolvePopconfirmButtonVariants(props, size.value), props.class));
</script>

<template>
  <PopconfirmConfirm v-bind="forwardedProps" :class="cls" @close="emit('close')">
    <slot />
  </PopconfirmConfirm>
</template>
