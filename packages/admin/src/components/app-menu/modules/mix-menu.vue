<script setup lang="ts">
import { computed, ref } from 'vue';
import { SButtonIcon, STreeMenu } from '@soybeanjs/ui';
import { toTreeMenuOptions } from '../shared';
import { useSiderMenuSync } from '../use-sider-menu-sync';
import { useMixMenuState } from '../use-mix-menu-state';
import { MIX_MENU_WIDTH } from '../../app-layout/shared';
import FirstLevelMenu from './first-level-menu.vue';
import type { AppMenuModeProps, AppMenuModeEmits } from './types';

defineOptions({
  name: 'AppMixMenu'
});

const props = withDefaults(defineProps<AppMenuModeProps>(), {
  mixMenuWidth: MIX_MENU_WIDTH
});

const emit = defineEmits<AppMenuModeEmits>();

const mix = useMixMenuState(
  computed(() => props.data),
  computed(() => props.selectedKey)
);

const secondLevelOptions = computed(() => toTreeMenuOptions(mix.secondLevelMenus.value));

const hasChildren = computed(() => mix.isActiveFirstLevelHasChildren.value);

const activeFirstLevel = computed(() => mix.firstLevelMenus.value.find(menu => menu.key === mix.activeFirstLevelKey.value));

// 对齐 soybean-admin `vertical-mix-menu`: the child drawer opens on click and
// floats over the content (absolute + shadow); it closes on mouseleave unless
// pinned, and a pinned drawer occupies sider space instead.
const drawerVisible = ref(false);

const showDrawer = computed(() => hasChildren.value && (drawerVisible.value || Boolean(props.mixSiderFixed)));

const mixHasDrawer = computed(() => Boolean(props.mixSiderFixed) && hasChildren.value);

useSiderMenuSync({ mixHasDrawer });

function handleSelectFirstLevel(key: string) {
  const selectedHasChildren = mix.handleSelectFirstLevel(key);

  if (selectedHasChildren) {
    drawerVisible.value = true;
    return;
  }

  drawerVisible.value = false;
  emit('select', key);
  emit('update:selectedKey', key);
}

function handleSelectSecondLevel(value: string | undefined) {
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
  <Teleport defer :to="siderMenuEl ? `#${siderMenuEl}` : undefined" :disabled="!siderMenuEl">
    <div :class="rootClass" class="flex" @mouseleave="handleResetDrawer">
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

      <div
        class="relative h-full transition-[width] duration-300 ease-linear"
        :style="{ width: mixHasDrawer ? `${mixMenuWidth}px` : '0px' }"
      >
        <div
          v-show="showDrawer"
          class="absolute inset-y-0 start-0 flex h-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground shadow-md transition-[width] duration-300 ease-linear"
          :style="{ width: `${mixMenuWidth}px` }"
        >
          <div class="flex h-12 shrink-0 items-center justify-between px-3">
            <span class="text-sm font-bold text-primary">{{ activeFirstLevel?.label }}</span>
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
            :items="secondLevelOptions"
            class="flex-1"
            @update:model-value="handleSelectSecondLevel"
            @update:expanded="emit('update:expanded', $event)"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
