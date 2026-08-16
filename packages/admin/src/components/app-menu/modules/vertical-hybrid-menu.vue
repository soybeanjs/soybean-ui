<script setup lang="ts">
import { computed, ref } from 'vue';
import { SButtonIcon, STreeMenu } from '@soybeanjs/ui';
import { findDeepestLeafMenu, toTreeMenuOptions } from '../shared';
import { useSiderMenuSync } from '../use-sider-menu-sync';
import { useMixMenuState } from '../use-mix-menu-state';
import { MIX_MENU_WIDTH } from '../../app-layout/shared';
import FirstLevelMenu from './first-level-menu.vue';
import AppHeaderMenu from './header-menu.vue';
import type { AppMenuModeProps, AppMenuModeEmits } from './types';

defineOptions({
  name: 'AppVerticalHybridMenu'
});

const props = withDefaults(defineProps<AppMenuModeProps>(), {
  mixMenuWidth: MIX_MENU_WIDTH,
  autoSelectFirstMenu: true
});

const emit = defineEmits<AppMenuModeEmits>();

const mix = useMixMenuState(
  computed(() => props.data),
  computed(() => props.selectedKey)
);

const childLevelOptions = computed(() => toTreeMenuOptions(mix.childLevelMenus.value));

const hasSecondLevel = computed(() => mix.isActiveFirstLevelHasChildren.value);

const activeSecondLevel = computed(() => mix.secondLevelMenus.value.find(menu => menu.key === mix.activeSecondLevelKey.value));

// 对齐 soybean-admin `vertical-hybrid-header-first`: the third-level drawer
// opens on click, floats over the content, closes on mouseleave unless pinned,
// and a pinned drawer occupies sider space instead.
const drawerVisible = ref(false);

const showChildDrawer = computed(
  () => mix.isActiveSecondLevelHasChildren.value && (drawerVisible.value || Boolean(props.mixSiderFixed))
);

const mixHasDrawer = computed(() => Boolean(props.mixSiderFixed) && mix.isActiveSecondLevelHasChildren.value);

useSiderMenuSync({ hasSecondLevel, mixHasDrawer });

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
  const hasChildren = mix.handleSelectSecondLevel(key);

  if (hasChildren) {
    drawerVisible.value = true;
    return;
  }

  drawerVisible.value = false;
  emit('select', key);
  emit('update:selectedKey', key);
}

function handleSelectChild(value: string | undefined) {
  if (!value) {
    return;
  }
  emit('select', value);
  emit('update:selectedKey', value);
}

function handleResetDrawer() {
  drawerVisible.value = false;
}

function handleToggleSiderCollapse() {
  emit('update:siderCollapse', !props.siderCollapse);
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
    <div :class="rootClass" class="flex" data-soybean-app-vertical-hybrid @mouseleave="handleResetDrawer">
      <FirstLevelMenu
        :menus="mix.secondLevelMenus.value"
        :active-key="mix.activeSecondLevelKey.value"
        :inverted="inverted"
        :sider-collapse="siderCollapse"
        @select="handleSelectSecondLevel"
        @toggle-sider-collapse="handleToggleSiderCollapse"
      >
        <template v-if="$slots.top" #top>
          <slot name="top" />
        </template>
        <template v-if="$slots.bottom" #bottom>
          <slot name="bottom" />
        </template>
      </FirstLevelMenu>

      <div
        class="relative h-full transition-[width] duration-300 ease-linear"
        :style="{ width: mixHasDrawer ? `${mixMenuWidth}px` : '0px' }"
      >
        <div
          v-show="showChildDrawer"
          class="absolute inset-y-0 start-0 flex h-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground shadow-md transition-[width] duration-300 ease-linear"
          :style="{ width: `${mixMenuWidth}px` }"
        >
          <div class="flex h-12 shrink-0 items-center justify-between px-3">
            <span class="text-sm font-bold text-primary">{{ activeSecondLevel?.label }}</span>
            <SButtonIcon
              :icon="mixSiderFixed ? 'lucide:pin' : 'lucide:pin-off'"
              variant="ghost"
              @click="emit('update:mixSiderFixed', !mixSiderFixed)"
            />
          </div>
          <STreeMenu
            :model-value="selectedKey"
            :default-value="defaultSelectedKey"
            :expanded="expanded"
            :default-expanded="defaultExpanded"
            :items="childLevelOptions"
            class="flex-1"
            @update:model-value="handleSelectChild"
            @update:expanded="emit('update:expanded', $event)"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
