<!-- <script setup lang="ts">
import { Primitive } from '../primitive';
import { useCollapsibleContext } from './context';
import type { CollapsibleContentEmits, CollapsibleContentProps } from './types';

const props = defineProps<CollapsibleContentProps>();

const emit = defineEmits<CollapsibleContentEmits>();

const { contentId, initContentId, open, disabled, unmountOnHide } = useCollapsibleContext('CollapsibleContent');

initContentId();
</script>

<template>
  <Primitive :id="contentId" :class="props.class" :as="props.as" :data-state="open ? 'open' : 'closed'">
    <slot />
  </Primitive>
</template>

<style scoped></style> -->
