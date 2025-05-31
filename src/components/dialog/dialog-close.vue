<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import type { DialogCloseProps } from './types';

defineOptions({
  name: 'DialogClose'
});

const props = withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button'
});

const { closeModal } = useDialogRootContext('DialogClose');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive v-bind="props" :type="tag" @click="closeModal">
    <slot />
  </Primitive>
</template>
