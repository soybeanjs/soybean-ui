<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useToastRootContext, useToastUi } from './context';
import type { ToastCloseProps } from './types';

defineOptions({
  name: 'ToastClose'
});

const props = withDefaults(defineProps<ToastCloseProps>(), {
  as: 'button'
});

const cls = useToastUi('close');

const { onClose } = useToastRootContext('ToastClose');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :type="tag" data-soybean-toast-announce-exclude @click="onClose">
    <slot />
  </Primitive>
</template>
