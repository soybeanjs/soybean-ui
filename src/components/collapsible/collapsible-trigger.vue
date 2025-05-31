<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useCollapsibleRootContext } from './context';
import type { CollapsibleTriggerProps } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button'
});

const { open, onOpenToggle, contentId, disabled, dataDisabled, dataState } =
  useCollapsibleRootContext('CollapsibleTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive
    v-bind="props"
    :type="tag"
    :aria-controls="contentId"
    :aria-expanded="open"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :disabled="disabled"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
