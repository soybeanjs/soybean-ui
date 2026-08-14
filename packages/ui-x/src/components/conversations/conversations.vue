<script setup lang="ts">
import { computed } from 'vue';
import type { ConversationItem } from '../../types';
import { conversationsVariants } from '../../styles/conversations';
import type { ConversationsProps } from './types';

defineOptions({
  name: 'SxConversations'
});

const props = withDefaults(defineProps<ConversationsProps>(), {
  active: null,
  onChange: undefined
});

const emit = defineEmits<{
  change: [item: ConversationItem];
}>();

const grouped = computed(() => {
  const map = new Map<string, ConversationItem[]>();

  for (const item of props.items) {
    const key = item.group ?? '';
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }

  return [...map.entries()].map(([group, items]) => ({ group, items }));
});

const variants = conversationsVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  groupTitle: variants.groupTitle,
  item: variants.item,
  itemActive: variants.itemActive
}));

function onSelect(item: ConversationItem): void {
  props.onChange?.(item);
  emit('change', item);
}
</script>

<template>
  <div :class="ui.root">
    <template v-for="group in grouped" :key="group.group">
      <div v-if="group.group" :class="ui.groupTitle">
        <slot name="groupTitle" :group="group.group">{{ group.group }}</slot>
      </div>
      <button
        v-for="item in group.items"
        :key="item.id"
        type="button"
        :class="[ui.item, { [ui.itemActive]: item.id === active }]"
        :aria-current="item.id === active ? 'true' : undefined"
        @click="onSelect(item)"
      >
        <slot name="item" :item="item">{{ item.title }}</slot>
      </button>
    </template>
  </div>
</template>
