<script setup lang="ts">
import { computed } from 'vue';
import { PopconfirmCancel } from '@soybeanjs/headless/popconfirm';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { usePopconfirmContext } from './context';
import { resolvePopconfirmButtonVariants } from './shared';
import type { PopconfirmCancelProps, PopconfirmCancelEmits } from './types';

defineOptions({
  name: 'SPopconfirmCancel'
});

const props = withDefaults(defineProps<PopconfirmCancelProps>(), {
  variant: 'pure'
});

const emit = defineEmits<PopconfirmCancelEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'fitContent', 'shadow', 'shape', 'size', 'variant']);

const { size } = usePopconfirmContext('PopconfirmCancel');

const cls = computed(() => cn(resolvePopconfirmButtonVariants(props, size.value, { variant: 'pure' }), props.class));
</script>

<template>
  <PopconfirmCancel v-bind="forwardedProps" :class="cls" @close="emit('close')">
    <slot />
  </PopconfirmCancel>
</template>
