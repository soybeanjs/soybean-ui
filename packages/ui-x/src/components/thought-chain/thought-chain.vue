<script setup lang="ts">
import { computed } from 'vue';
import { useThoughtChain } from '../../composables';
import { thoughtChainVariants } from '../../styles/thought-chain';
import type { ThoughtChainProps } from './types';

defineOptions({
  name: 'SxThoughtChain'
});

const props = withDefaults(defineProps<ThoughtChainProps>(), {
  defaultExpand: false
});

const chain = useThoughtChain(props.items, { defaultExpand: props.defaultExpand });

const statusSymbol: Record<string, string> = {
  pending: '·',
  loading: '⟳',
  success: '✓',
  error: '✕'
};

const variants = thoughtChainVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  item: variants.item,
  header: variants.header,
  content: variants.content,
  status: variants.status
}));
</script>

<template>
  <ol :class="ui.root">
    <li v-for="item in chain.items.value" :key="item.key" :class="ui.item">
      <button
        v-if="item.content"
        type="button"
        :class="ui.header"
        :aria-expanded="chain.isExpanded(item.key)"
        @click="chain.toggle(item.key)"
      >
        <span :class="ui.status" aria-hidden="true">{{ statusSymbol[item.status ?? 'pending'] ?? '·' }}</span>
        <span v-if="item.icon" aria-hidden="true">{{ item.icon }}</span>
        <slot name="title" :item="item">{{ item.title }}</slot>
        <span v-if="item.content" aria-hidden="true" class="ml-auto">{{ chain.isExpanded(item.key) ? '▾' : '▸' }}</span>
      </button>
      <div v-else :class="ui.header">
        <span :class="ui.status" aria-hidden="true">{{ statusSymbol[item.status ?? 'pending'] ?? '·' }}</span>
        <span v-if="item.icon" aria-hidden="true">{{ item.icon }}</span>
        <slot name="title" :item="item">{{ item.title }}</slot>
      </div>
      <div v-if="item.content" v-show="chain.isExpanded(item.key)" :class="ui.content">
        <slot name="content" :item="item">{{ item.content }}</slot>
      </div>
    </li>
  </ol>
</template>
