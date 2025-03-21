<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectCollapsibleRootContext } from './context';
import type { CollapsibleTriggerProps } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button'
});

const { contentId, open, disabled, dataState, dataDisabled, onOpenToggle } = injectCollapsibleRootContext();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :type="tag"
    :aria-controls="contentId"
    :data-disabled="dataDisabled"
    :aria-expanded="open"
    :data-state="dataState"
    :disabled="disabled"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
