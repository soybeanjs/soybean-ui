<script setup lang="ts">
import { computed, watch } from 'vue';
import { useThink } from '../../composables';
import { thinkVariants } from '../../styles/think';
import type { ThinkProps } from './types';

defineOptions({
  name: 'SxThink'
});

const props = withDefaults(defineProps<ThinkProps>(), {
  title: '',
  defaultOpen: false,
  onToggleChange: undefined
});

const emit = defineEmits<{
  toggleChange: [open: boolean];
}>();

const think = useThink(props.defaultOpen);

watch(
  () => props.defaultOpen,
  open => {
    if (open) think.openPanel();
    else think.close();
  }
);

watch(
  () => think.open.value,
  open => {
    props.onToggleChange?.(open);
    emit('toggleChange', open);
  }
);

const variants = thinkVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  trigger: variants.trigger,
  content: variants.content
}));
</script>

<template>
  <div :class="ui.root">
    <button type="button" :class="ui.trigger" :aria-expanded="think.open.value" @click="think.toggle()">
      <span aria-hidden="true">{{ think.open.value ? '▾' : '▸' }}</span>
      <slot name="trigger" :open="think.open.value">{{ title || 'Thought' }}</slot>
    </button>
    <div v-show="think.open.value" :class="ui.content">
      <slot />
    </div>
  </div>
</template>
