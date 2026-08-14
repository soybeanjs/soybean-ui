<script setup lang="ts">
import { computed } from 'vue';
import type { Prompt } from '../../types';
import { promptsVariants } from '../../styles/prompts';
import type { PromptsProps } from './types';

defineOptions({
  name: 'SxPrompts'
});

const props = withDefaults(defineProps<PromptsProps>(), {
  onSelect: undefined
});

const emit = defineEmits<{
  select: [prompt: Prompt];
}>();

const variants = promptsVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  item: variants.item
}));
</script>

<template>
  <div :class="ui.root">
    <button v-for="prompt in prompts" :key="prompt.key" type="button" :class="ui.item" @click="emit('select', prompt)">
      <span v-if="prompt.icon" aria-hidden="true">{{ prompt.icon }}</span>
      <slot name="label" :prompt="prompt">{{ prompt.label }}</slot>
    </button>
  </div>
</template>
