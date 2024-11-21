<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectCollapsibleRootContext } from './context';
import type { CollapsibleTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const props = withDefaults(defineProps<CollapsibleTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const { contentId, open, disabled, dataState, dataDisabled, onOpenToggle } = injectCollapsibleRootContext();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive
    :class="props.class"
    :type="tag"
    :as="as"
    :as-child="asChild"
    :aria-controls="contentId"
    :aria-expanded="open"
    :data-state="dataState"
    :data-disabled="dataDisabled"
    :disabled="disabled"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
