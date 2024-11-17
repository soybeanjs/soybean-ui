<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectCollapsibleRootContext } from './context';
import type { CollapsibleTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const { as = 'button', class: className } = defineProps<CollapsibleTriggerPropsWithPrimitive>();

const { contentId, open, disabled, dataState, dataDisabled, onOpenToggle } = injectCollapsibleRootContext();

const tag = computed(() => (as === 'button' ? 'button' : undefined));

useForwardExpose();
</script>

<template>
  <Primitive
    :type="tag"
    :as
    :as-child
    :aria-controls="contentId"
    :aria-expanded="open"
    :data-state="dataState"
    :data-disabled="dataDisabled"
    :disabled="disabled"
    :class="className"
    @click="onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
