<script setup lang="ts">
import { computed } from 'vue';
import { SIcon } from '@soybeanjs/ui';
import { appMenuFirstLevelVariants } from '@/styles/app-menu';
import type { AppMenuData } from '../../../types';
import type { AppMenuSlots } from '../types';

defineOptions({
  name: 'AppFirstLevelMenu'
});

const props = withDefaults(
  defineProps<{
    /** First-level menu nodes (key / label / icon only). */
    menus: AppMenuData[];
    /** The active first-level menu key. */
    activeKey?: string;
    /** Whether to use inverted (dark) styling. */
    inverted?: boolean;
    /** Whether the sider is collapsed to icons. */
    siderCollapse?: boolean;
  }>(),
  {
    activeKey: undefined,
    inverted: false,
    siderCollapse: false
  }
);

const emit = defineEmits<{
  /** Emitted when a first-level item is chosen. */
  select: [key: string];
  /** Emitted when the sider collapse toggle is clicked. */
  toggleSiderCollapse: [];
}>();

defineSlots<Pick<AppMenuSlots, 'top' | 'bottom'>>();

const variants = computed(() => appMenuFirstLevelVariants({ inverted: props.inverted }));

function handleSelect(key: string) {
  emit('select', key);
}

function handleToggle() {
  emit('toggleSiderCollapse');
}
</script>

<template>
  <!-- 对齐 soybean-admin `first-level-menu` 的 `flex-1-hidden`：rail 用 flex-1
       填满 sider 剩余宽度（sider 归 0 时 rail 随之归 0，不产生溢出）。 -->
  <div :class="variants.root" data-soybean-first-level-menu-root>
    <slot name="top" />

    <div class="flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto">
      <div
        v-for="menu in menus"
        :key="menu.key"
        :class="[variants.item, menu.key === activeKey ? variants.itemActive : variants.itemDefault]"
        :title="menu.label"
        :data-active="menu.key === activeKey ? '' : undefined"
        @click="handleSelect(menu.key)"
      >
        <SIcon :icon="menu.icon" class="text-icon-large" />
        <p v-if="!siderCollapse" class="w-full ellipsis-text text-center text-xs">{{ menu.label }}</p>
      </div>
    </div>

    <slot name="bottom" />

    <button type="button" :class="variants.collapseButton" @click="handleToggle">
      <SIcon :icon="siderCollapse ? 'lucide:panel-right-close' : 'lucide:panel-left-close'" />
    </button>
  </div>
</template>
