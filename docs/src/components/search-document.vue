<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMagicKeys } from '@vueuse/core';
import type { CommandOptionData, SelectEvent } from '@soybeanjs/ui';
import { toKebabCase, toPascalCase } from '@soybeanjs/headless/shared';
import { components } from '../../../src/constants/components';

defineOptions({
  name: 'SearchDocument',
  inheritAttrs: false
});

const attrs = useAttrs();
const router = useRouter();
const { t } = useI18n();
const keys = useMagicKeys();

const search = shallowRef('');

const excludes: string[] = ['configProvider', 'label', 'icon', 'menu'];

const componentMenus = Object.keys(components)
  .filter(key => !excludes.includes(key))
  .map(
    key =>
      ({
        label: toPascalCase(key),
        value: `components_${toKebabCase(key)}`
      }) satisfies CommandOptionData
  );

const searched: CommandOptionData[] = [
  {
    label: 'Overview',
    value: 'overview',
    icon: 'lucide:home',
    separator: true,
    items: [
      {
        label: 'Introduction',
        value: 'overview_introduction'
      },
      {
        label: 'Quick Start',
        value: 'overview_quick-start'
      }
    ]
  },
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:layout-grid',
    items: componentMenus
  }
];

const searchOpen = shallowRef(false);

const CmdK = computed(() => keys['Cmd+K']?.value);

function handleOpenChange() {
  searchOpen.value = !searchOpen.value;
}

watch(CmdK, v => {
  if (v) {
    handleOpenChange();
  }
});

function handleSelect(item: SelectEvent<string>) {
  const value = item.detail.value;
  if (!value) return;

  const path = `/${value.split('_').join('/')}`;
  router.push(path);
  searchOpen.value = false;
  search.value = '';
}
</script>

<template>
  <SDialogPure v-model:open="searchOpen">
    <template #trigger>
      <div
        v-bind="attrs"
        class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <SIcon icon="lucide:search" class="text-base" />
        <span class="placeholder">{{ t('layout.header.search') }}</span>
        <SKbd :value="['command', 'k']" class="ml-auto" />
      </div>
    </template>

    <SCommand
      v-model:search-term="search"
      class="border rounded-lg shadow-md"
      :items="searched"
      :input-props="{ placeholder: t('layout.header.search') }"
      :empty-label="t('layout.header.search-empty')"
      @select="handleSelect"
    >
      <template #item-leading>
        <SIcon icon="lucide:arrow-right" />
      </template>
    </SCommand>
  </SDialogPure>
</template>
