<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useToastRootContext, useToastUi } from './context';
import type { ToastActionProps } from './types';

defineOptions({
  name: 'ToastAction'
});

const props = withDefaults(defineProps<ToastActionProps>(), {
  as: 'button'
});

const cls = useToastUi('action');

const { onClose } = useToastRootContext('ToastAction');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :type="tag"
    :data-soybean-toast-announce-alt="altText"
    data-soybean-toast-announce-exclude
    @click="onClose"
  >
    <slot />
  </Primitive>
</template>
