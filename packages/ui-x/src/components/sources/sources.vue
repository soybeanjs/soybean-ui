<script setup lang="ts">
import { computed } from 'vue';
import { sourcesVariants } from '../../styles/sources';
import type { Source } from '../../types';
import type { SourcesProps } from './types';

defineOptions({
  name: 'SxSources'
});

const props = withDefaults(defineProps<SourcesProps>(), {
  onSelect: undefined
});

const emit = defineEmits<{
  select: [source: Source];
}>();

const variants = sourcesVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  item: variants.item,
  link: variants.link
}));
</script>

<template>
  <div :class="ui.root">
    <div v-for="source in sources" :key="source.key" :class="ui.item">
      <span aria-hidden="true">📎</span>
      <a
        v-if="source.url"
        :class="ui.link"
        :href="source.url"
        target="_blank"
        rel="noopener noreferrer"
        @click="emit('select', source)"
      >
        <slot name="label" :source="source">{{ source.title }}</slot>
      </a>
      <span v-else :class="ui.link">
        <slot name="label" :source="source">{{ source.title }}</slot>
      </span>
    </div>
  </div>
</template>
