<script setup lang="ts">
import { computed, ref } from 'vue';
import { folderVariants } from '../../styles/folder';
import type { FolderProps } from './types';

defineOptions({
  name: 'SxFolder'
});

const props = withDefaults(defineProps<FolderProps>(), {
  count: undefined,
  defaultOpen: false
});

const open = ref(props.defaultOpen);

const variants = folderVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  header: variants.header,
  icon: variants.icon,
  name: variants.name,
  badge: variants.badge,
  content: variants.content
}));
</script>

<template>
  <div :class="ui.root">
    <button type="button" :class="ui.header" :aria-expanded="open" @click="open = !open">
      <span :class="ui.icon" aria-hidden="true">
        <slot name="icon" :open="open">📁</slot>
      </span>
      <span :class="ui.name">
        <slot name="name">{{ name }}</slot>
      </span>
      <span v-if="count !== undefined" :class="ui.badge">{{ count }}</span>
    </button>
    <div v-if="$slots.default" v-show="open" :class="ui.content">
      <slot />
    </div>
  </div>
</template>
