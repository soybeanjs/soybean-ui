<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { usePopoverRootContext } from './context';
import type { PopoverCloseProps } from './types';

defineOptions({
  name: 'PopoverClose'
});

const props = withDefaults(defineProps<PopoverCloseProps>(), {
  as: 'button'
});

const { onOpenChange } = usePopoverRootContext('PopoverClose');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
