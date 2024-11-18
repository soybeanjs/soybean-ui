<script setup lang="ts">
import { computed } from 'vue';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import { injectCollapsibleRootContext } from './context';
import type { CollapsibleTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const { class: className, as = 'button' } = defineProps<CollapsibleTriggerPropsWithPrimitive>();

const { contentId, open, disabled, dataState, dataDisabled, onOpenToggle } = injectCollapsibleRootContext();

const tag = computed(() => (as === 'button' ? 'button' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive
    :class="className"
    :type="tag"
    :as
    :as-child
    :aria-controls="contentId"
    :aria-expanded="open"
    :data-state
    :data-disabled
    :disabled
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
