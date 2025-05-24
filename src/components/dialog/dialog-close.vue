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
  <Primitive :class="props.class" :as="as" :type="tag" @click="closeModal">
    <slot />
  </Primitive>
</template>
