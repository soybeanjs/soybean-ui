<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import type { DialogCloseProps } from './types';

defineOptions({
  name: 'DialogClose'
});

const props = defineProps<DialogCloseProps>();

const { onOpenChange } = useDialogRootContext('DialogClose');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
