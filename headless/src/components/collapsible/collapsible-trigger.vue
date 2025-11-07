<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useCollapsibleRootContext, useCollapsibleThemeContext } from './context';
import type { CollapsibleTriggerProps } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button'
});

const { open, onOpenToggle, contentId, disabled, dataDisabled, dataState } =
  useCollapsibleRootContext('CollapsibleTrigger');

const themeContext = useCollapsibleThemeContext();

const cls = computed(() => themeContext?.ui?.value?.trigger);

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
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
