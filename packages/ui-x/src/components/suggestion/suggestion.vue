<script setup lang="ts">
import { computed } from 'vue';
import type { Prompt } from '../../types';
import { suggestionVariants } from '../../styles/suggestion';
import type { SuggestionProps } from './types';

defineOptions({
  name: 'SxSuggestion'
});

const props = withDefaults(defineProps<SuggestionProps>(), {
  onSelect: undefined
});

const emit = defineEmits<{
  select: [suggestion: Prompt];
}>();

const variants = suggestionVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  item: variants.item
}));
</script>

<template>
  <div :class="ui.root">
    <button
      v-for="suggestion in suggestions"
      :key="suggestion.key"
      type="button"
      :class="ui.item"
      @click="emit('select', suggestion)"
    >
      <span v-if="suggestion.icon" aria-hidden="true">{{ suggestion.icon }}</span>
      <slot name="label" :suggestion="suggestion">{{ suggestion.label }}</slot>
    </button>
  </div>
</template>
