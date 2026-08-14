<script setup lang="ts">
import { computed } from 'vue';
import { actionsVariants } from '../../styles/actions';
import type { ActionItem, ActionsProps } from './types';

defineOptions({
  name: 'SxActions'
});

const props = withDefaults(defineProps<ActionsProps>(), {
  items: undefined
});

const emit = defineEmits<{
  action: [item: ActionItem];
}>();

const variants = actionsVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  item: variants.item
}));

function onAction(item: ActionItem): void {
  if (item.disabled) return;
  emit('action', item);
}
</script>

<template>
  <div :class="ui.root">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      :class="ui.item"
      :data-disabled="item.disabled || undefined"
      :disabled="item.disabled"
      :aria-label="item.label"
      @click="onAction(item)"
    >
      <slot name="icon" :item="item">
        <span v-if="item.icon" aria-hidden="true">{{ item.icon }}</span>
      </slot>
      <slot name="label" :item="item">{{ item.label }}</slot>
    </button>
  </div>
</template>
