<script setup lang="ts">
import { computed, ref } from 'vue';
import type { MenuOptionData } from '@soybeanjs/headless/menu';
import { SMenubar } from '@soybeanjs/ui';
import { menuContainsKey, toMenuOptions } from '../shared';
import type { AppMenuModeProps, AppMenuModeEmits } from './types';

defineOptions({
  name: 'AppHorizontalMenu'
});

const props = defineProps<AppMenuModeProps>();

const emit = defineEmits<AppMenuModeEmits>();

const items = computed(() => toMenuOptions(props.data));

// The menubar highlights nested options through `activeValue`, but top-level
// triggers need their own active state: the branch containing the selected key
// stays highlighted (对齐 soybean-admin horizontal NMenu 的 value 高亮).
function isBranchActive(value: string | number | undefined): boolean {
  const key = value === undefined ? undefined : String(value);
  const branch = props.data.find(menu => menu.key === key);
  return Boolean(branch && menuContainsKey(branch, props.selectedKey ?? props.defaultSelectedKey));
}

const openMenuValue = ref<string | undefined>();

function handleUpdateModelValue(value: string | number | undefined) {
  const key = value === undefined ? undefined : String(value);
  openMenuValue.value = key;

  if (!key) return;

  const item = props.data.find(d => d.key === key);

  if (item && !item.children?.length) {
    emit('select', key);
    emit('update:selectedKey', key);
    openMenuValue.value = undefined;
  }
}

function handleSelect(item: MenuOptionData) {
  const key = String(item.value);
  emit('select', key);
  emit('update:selectedKey', key);
  openMenuValue.value = undefined;
}
</script>

<template>
  <Teleport defer :to="headerMenuEl ? `#${headerMenuEl}` : undefined" :disabled="!headerMenuEl">
    <SMenubar
      :model-value="openMenuValue"
      :items="items"
      :active-value="selectedKey"
      :class="rootClass"
      :ui="{
        root: 'h-full w-full border-0 shadow-none rounded-none bg-transparent',
        trigger: 'h-full'
      }"
      data-soybean-app-horizontal
      @update:model-value="handleUpdateModelValue"
      @select="handleSelect"
    >
      <template #trigger="{ item }">
        <span
          class="flex items-center gap-1.5 transition-colors duration-200"
          :class="isBranchActive(item.value) ? 'text-primary font-medium' : 'text-foreground'"
          :data-active="isBranchActive(item.value) ? '' : undefined"
        >
          <span>{{ item.label }}</span>
        </span>
      </template>
    </SMenubar>
  </Teleport>
</template>
