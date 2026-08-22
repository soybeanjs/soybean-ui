<script setup lang="ts" generic="T extends SplitMenuBaseOptionData = SplitMenuBaseOptionData">
import { computed } from 'vue';
import { MenubarCompact } from '../menubar';
import { TreeMenuCompact } from '../tree-menu';
import {
  getSplitMenuActiveValues,
  hasSplitMenuChildren,
  sliceSplitMenuItems,
  toSplitMenuOptionData,
  toSplitMenuTreeOptions
} from './shared';
import { useSplitMenuRootContext, useSplitMenuUi } from './context';
import type { SplitMenuBaseOptionData, SplitMenuPanelEmits, SplitMenuPanelProps } from './types';

defineOptions({
  name: 'SplitMenuPanel'
});

const props = withDefaults(defineProps<SplitMenuPanelProps>(), {
  depth: 1,
  orientation: 'vertical',
  items: () => []
});

const emit = defineEmits<SplitMenuPanelEmits>();

const ui = useSplitMenuUi();

const { modelValue, collapsed, onModelValueChange } = useSplitMenuRootContext('SplitMenuPanel');

const activeValues = computed(() => getSplitMenuActiveValues(props.items, modelValue.value));

const panelItems = computed(() => sliceSplitMenuItems(props.items, activeValues.value, props.depth));

const panelTreeItems = computed(() => toSplitMenuTreeOptions(panelItems.value));

const panelMenuItems = computed(() => toSplitMenuOptionData(panelItems.value));

const mountTarget = computed(() => {
  if (props.orientation === 'horizontal') {
    return props.horizontalMenuEl ? `#${props.horizontalMenuEl}` : undefined;
  }

  return props.verticalMenuEl ? `#${props.verticalMenuEl}` : undefined;
});

const panelClass = computed(() => ui.value.panel);

function handleTreeSelect(value: string) {
  onModelValueChange(value);

  if (!hasSplitMenuChildren(props.items, value)) {
    emit('panelSelect', value);
  }
}

function handleMenubarSelect(value: unknown) {
  const key = String(value);
  onModelValueChange(key);
  emit('panelSelect', key);
}

function handleMenubarModelValue(value: unknown) {
  const key = value === undefined || value === null ? '' : String(value);

  if (!key) {
    return;
  }

  onModelValueChange(key);
}
</script>

<template>
  <Teleport defer :to="mountTarget" :disabled="!mountTarget">
    <div data-soybean-split-menu-panel :class="panelClass" :data-orientation="orientation" :data-depth="depth">
      <TreeMenuCompact
        v-if="orientation === 'vertical'"
        :model-value="modelValue"
        :collapsed="depth === 1 ? collapsed : false"
        :items="panelTreeItems"
        @update:model-value="handleTreeSelect"
      >
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
        <template #item-leading="{ item }">
          <slot name="item-leading" :item="item" />
        </template>
        <template #item-trailing="{ item }">
          <slot name="item-trailing" :item="item" />
        </template>
      </TreeMenuCompact>
      <MenubarCompact
        v-else
        :items="panelMenuItems"
        :active-value="modelValue"
        @update:model-value="handleMenubarModelValue"
        @select="handleMenubarSelect"
      >
        <template #trigger="{ item }">
          <slot name="trigger" :item="item" />
        </template>
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
      </MenubarCompact>
    </div>
  </Teleport>
</template>
