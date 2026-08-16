<script setup lang="ts">
import { computed } from 'vue';
import { findDeepestLeafMenu } from '../shared';
import { useMixMenuState } from '../use-mix-menu-state';
import FirstLevelMenu from './first-level-menu.vue';
import AppHeaderMenu from './header-menu.vue';
import type { AppMenuModeProps, AppMenuModeEmits } from './types';

defineOptions({
  name: 'AppTopSidebarMenu'
});

const props = withDefaults(defineProps<AppMenuModeProps>(), {
  autoSelectFirstMenu: true
});

const emit = defineEmits<AppMenuModeEmits>();

const mix = useMixMenuState(
  computed(() => props.data),
  computed(() => props.selectedKey)
);

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

function handleSelectSecondLevel(key: string) {
  const item = mix.secondLevelMenus.value.find(m => m.key === key);

  if (!item) return;

  if (!item.children?.length) {
    emit('select', key);
    emit('update:selectedKey', key);
    return;
  }

  if (props.autoSelectFirstMenu) {
    const deepest = findDeepestLeafMenu(item.children);
    if (deepest) {
      emit('select', deepest.key);
      emit('update:selectedKey', deepest.key);
    }
  }
}

function handleToggleSiderCollapse() {
  emit('update:siderCollapse', !props.siderCollapse);
}
</script>

<template>
  <Teleport defer :to="headerMenuEl ? `#${headerMenuEl}` : undefined" :disabled="!headerMenuEl">
    <AppHeaderMenu
      :items="mix.secondLevelMenus.value"
      :active-key="mix.activeSecondLevelKey.value"
      @select="handleSelectSecondLevel"
    />
  </Teleport>

  <Teleport defer :to="siderMenuEl ? `#${siderMenuEl}` : undefined" :disabled="!siderMenuEl">
    <div :class="rootClass" class="h-full pt-2" data-soybean-app-top-sidebar>
      <FirstLevelMenu
        :menus="mix.firstLevelMenus.value"
        :active-key="mix.activeFirstLevelKey.value"
        :inverted="inverted"
        :sider-collapse="siderCollapse"
        @select="handleSelectFirstLevel"
        @toggle-sider-collapse="handleToggleSiderCollapse"
      >
        <template v-if="$slots.top" #top>
          <slot name="top" />
        </template>
        <template v-if="$slots.bottom" #bottom>
          <slot name="bottom" />
        </template>
      </FirstLevelMenu>
    </div>
  </Teleport>
</template>
