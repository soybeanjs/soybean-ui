<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import type { CommandOptionData, SelectEvent } from '@soybeanjs/ui';
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { components } from '../../../src/constants/components';

defineOptions({
  name: 'SearchDocument'
});

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

const searched = computed<CommandOptionData[]>(() => [
  {
    label: t('sidebar.overview'),
    value: 'overview',
    icon: 'lucide:home',
    separator: true,
    items: [
      {
        label: t('sidebar.introduction'),
        value: 'overview_introduction'
      },
      {
        label: t('sidebar.quick_start'),
        value: 'overview_quick-start'
      },
      {
        label: t('sidebar.theming'),
        value: 'overview_theming'
      },
      {
        label: t('sidebar.llms'),
        value: 'overview_llms'
      }
    ]
  },
  {
    label: t('sidebar.components'),
    value: 'components',
    icon: 'lucide:layout-grid',
    items: componentMenus
  }
]);

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
  <SDialog v-model:open="searchOpen" pure :show-close="false">
    <template #trigger>
      <SButton color="accent" variant="soft">
        <SIcon icon="lucide:search" class="text-base" />
        <span class="lt-md:hidden">{{ t('layout.header.search') }}</span>
        <SKbd :value="['command', 'k']" class="ms-auto" />
      </SButton>
    </template>

    <SCommand
      v-model:search-term="search"
      class="border rounded-lg shadow-md"
      :items="searched"
      :input-props="{ placeholder: t('layout.header.search') }"
      :empty-label="t('layout.header.search_empty')"
      @select="handleSelect"
    >
      <template #item-leading>
        <SIcon icon="lucide:arrow-right" />
      </template>
      <template #bottom>
        <div class="flex-y-center gap-2 h-10 px-4 border-t border-solid">
          <SKbd value="enter" />
          <span>Go to Page</span>
        </div>
      </template>
    </SCommand>
  </SDialog>
</template>
