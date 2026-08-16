<script setup lang="ts">
import { computed } from 'vue';
import { STreeMenu } from '@soybeanjs/ui';
import { findDeepestLeafMenu, toTreeMenuOptions } from '../shared';
import { useSiderMenuSync } from '../use-sider-menu-sync';
import { useMixMenuState } from '../use-mix-menu-state';
import AppHeaderMenu from './header-menu.vue';
import type { AppMenuModeProps, AppMenuModeEmits } from './types';

defineOptions({
  name: 'AppTopHeaderMenu'
});

const props = withDefaults(defineProps<AppMenuModeProps>(), {
  autoSelectFirstMenu: true
});

const emit = defineEmits<AppMenuModeEmits>();

const mix = useMixMenuState(
  computed(() => props.data),
  computed(() => props.selectedKey)
);

const secondLevelOptions = computed(() => toTreeMenuOptions(mix.secondLevelMenus.value));

// The sider renders the second-level tree; report emptiness so the layout can
// hide the sider while the active first-level branch is a leaf.
const hasSecondLevel = computed(() => mix.isActiveFirstLevelHasChildren.value);

useSiderMenuSync({ hasSecondLevel });

function handleSelectFirstLevel(key: string) {
  const hasChildren = mix.handleSelectFirstLevel(key);

  if (!hasChildren) {
    emit('select', key);
    emit('update:selectedKey', key);
    return;
  }

  if (props.autoSelectFirstMenu) {
    const deepest = findDeepestLeafMenu(mix.secondLevelMenus.value);
    if (deepest) {
      emit('select', deepest.key);
      emit('update:selectedKey', deepest.key);
    }
  }
}

function handleSelectSecondLevel(value: string | undefined) {
  if (!value) {
    return;
  }
  emit('select', value);
  emit('update:selectedKey', value);
}
</script>

<template>
  <Teleport defer :to="headerMenuEl ? `#${headerMenuEl}` : undefined" :disabled="!headerMenuEl">
    <AppHeaderMenu
      :items="mix.firstLevelMenus.value"
      :active-key="mix.activeFirstLevelKey.value"
      @select="handleSelectFirstLevel"
    />
  </Teleport>

  <Teleport defer :to="siderMenuEl ? `#${siderMenuEl}` : undefined" :disabled="!siderMenuEl">
    <STreeMenu
      :model-value="selectedKey"
      :default-value="defaultSelectedKey"
      :expanded="expanded"
      :default-expanded="defaultExpanded"
      :collapsed="siderCollapse"
      :collapsed-width="collapsedWidth"
      :items="secondLevelOptions"
      :class="rootClass"
      data-soybean-app-top-header
      @update:model-value="handleSelectSecondLevel"
      @update:expanded="emit('update:expanded', $event)"
    />
  </Teleport>
</template>
