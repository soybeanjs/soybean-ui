<script setup lang="ts">
import { computed } from 'vue';
import { welcomeVariants } from '../../styles/welcome';
import type { Prompt } from '../../types';
import { SxPrompts } from '../prompts';
import type { WelcomeProps } from './types';

defineOptions({
  name: 'SxWelcome'
});

const props = withDefaults(defineProps<WelcomeProps>(), {
  title: '',
  description: '',
  prompts: undefined,
  onSelectPrompt: undefined
});

const emit = defineEmits<{
  selectPrompt: [prompt: Prompt];
}>();

const variants = welcomeVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  title: variants.title,
  description: variants.description
}));
</script>

<template>
  <div :class="ui.root">
    <slot name="title">
      <h2 v-if="title" :class="ui.title">{{ title }}</h2>
    </slot>
    <slot name="description">
      <p v-if="description" :class="ui.description">{{ description }}</p>
    </slot>
    <SxPrompts v-if="prompts?.length" :prompts="prompts" @select="emit('selectPrompt', $event)" />
  </div>
</template>
