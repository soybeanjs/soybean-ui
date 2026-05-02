<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import type { CommandOptionData, SelectEvent } from '@soybeanjs/ui';
import { kebabCase, pascalCase } from '@soybeanjs/utils';
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
        label: pascalCase(key),
        value: `components_${kebabCase(key)}`
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
  <SDialog
    v-model:open="searchOpen"
    pure
    :show-close="false"
    :ui="{ overlay: 'docs-floating-overlay', popup: 'docs-command-dialog' }"
  >
    <template #trigger>
      <div
        v-bind="attrs"
        class="docs-search-trigger flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors"
      >
        <SIcon icon="lucide:search" class="text-base" />
        <span class="placeholder">{{ t('layout.header.search') }}</span>
        <SKbd :value="['command', 'k']" class="ml-auto" />
      </div>
    </template>

    <SCommand
      v-model:search-term="search"
      class="docs-command-surface border rounded-lg shadow-md"
      :ui="{
        root: 'docs-command-root',
        list: 'docs-command-list',
        inputRoot: 'docs-command-input-root',
        inputControl: 'docs-command-input-control',
        item: 'docs-command-item',
        group: 'docs-command-group',
        groupLabel: 'docs-command-group-label',
        empty: 'docs-command-empty'
      }"
      :items="searched"
      :input-props="{ placeholder: t('layout.header.search') }"
      :empty-label="t('layout.header.search_empty')"
      @select="handleSelect"
    >
      <template #item-leading>
        <SIcon icon="lucide:arrow-right" />
      </template>
      <template #bottom>
        <div class="docs-command-footer flex-y-center gap-2 h-10 px-4 border-t border-solid">
          <SKbd value="enter" />
          <span>Go to Page</span>
        </div>
      </template>
    </SCommand>
  </SDialog>
</template>
