<script setup lang="ts">
import type { AppMenuData } from '../../../types';

defineOptions({
  name: 'AppHeaderMenu'
});

/**
 * A horizontal header menu bar used by the header-level modes
 * (`vertical-hybrid` / `top-sidebar` / `top-header`). Renders first/second-level
 * items as uniform clickable buttons — unlike `SNavigationMenu`'s dropdown
 * triggers, clicking an item emits `select` so the parent can activate a branch
 * or navigate a leaf.
 */
const props = withDefaults(
  defineProps<{
    /** Menu items to render (first- or second-level). */
    items: AppMenuData[];
    /** The active item key. */
    activeKey?: string;
  }>(),
  {
    activeKey: undefined
  }
);

const emit = defineEmits<{
  /** Emitted when an item is clicked. */
  select: [key: string];
}>();

function handleSelect(key: string) {
  emit('select', key);
}
</script>

<template>
  <div class="flex h-full items-stretch">
    <button
      v-for="item in items"
      :key="item.key"
      type="button"
      class="flex items-center gap-1.5 px-3 text-sm font-medium transition-colors duration-200 outline-none cursor-pointer"
      :class="item.key === activeKey ? 'text-primary' : 'text-foreground hover:bg-accent hover:text-accent-foreground'"
      :data-active="item.key === activeKey ? '' : undefined"
      @click="handleSelect(item.key)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
