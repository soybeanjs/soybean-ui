<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useDialogRootContext, useDialogThemeContext } from './context';
import type { DialogCloseProps } from './types';

defineOptions({
  name: 'DialogClose'
});

const props = defineProps<DialogCloseProps>();

const { onOpenChange } = useDialogRootContext('DialogClose');

const theme = useDialogThemeContext();

const cls = computed(() => theme?.ui?.value?.closable);

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive v-bind="props" :class="cls" :type="tag" @click="onOpenChange(false)">
    <slot />
  </Primitive>
</template>
