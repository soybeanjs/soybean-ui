<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useCollapsibleContext } from './context';
import type { CollapsibleTriggerProps } from './types';

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button'
});

const { open, onOpenToggle, contentId, disabled } = useCollapsibleContext('CollapsibleTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :aria-controls="contentId"
    :aria-expanded="open"
    :data-disabled="disabled ? '' : undefined"
    :data-state="open ? 'open' : 'closed'"
    :disabled="disabled"
    :tag="tag"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
