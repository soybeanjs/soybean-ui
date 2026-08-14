<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { MarkdownRender } from 'markstream-vue';
import 'markstream-vue/index.css';
import { markdownVariants } from '../../styles/markdown';
import type { MarkdownProps } from './types';

defineOptions({
  name: 'SxMarkdown'
});

const props = withDefaults(defineProps<MarkdownProps>(), {
  mode: 'chat',
  htmlPolicy: 'safe',
  typewriter: false
});

const slots = useSlots();

const variants = markdownVariants();

const ui = computed(() => ({
  root: [variants.root, props.class]
}));
</script>

<template>
  <div :class="ui.root">
    <MarkdownRender
      :content="content"
      :final="final"
      :mode="mode"
      :html-policy="htmlPolicy"
      :is-dark="isDark"
      :typewriter="typewriter"
      :smooth-streaming="smoothStreaming"
      :code-renderer="codeRenderer"
      :parse-options="parseOptions"
      v-bind="rendererProps"
    >
      <template v-for="(_, name) in slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </MarkdownRender>
  </div>
</template>
