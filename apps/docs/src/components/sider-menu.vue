<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { kebabCase, pascalCase } from '@soybeanjs/headless/shared';
import type { TreeMenuOptionData } from '@soybeanjs/ui';
import { useLocalePrefix } from '~/composables/use-locale-prefix';
import {
  menuData,
  newlyComponentKeys,
  uiXMenuData,
  uiXNewlyComponentKeys,
  adminMenuData,
  adminNewlyComponentKeys,
  chartMenuData,
  chartNewlyComponentKeys
} from '~/constants/menus';

type Emits = {
  select: [];
};

const emit = defineEmits<Emits>();

const route = useRoute();
const { t } = useI18n();
const { barePath, localizedTo } = useLocalePrefix();

const expanded = ref<string[]>([]);

const selected = ref<string>('');

const componentsOverviewValue = 'components-overview';

const section = computed(() => barePath(route.path).split('/').filter(Boolean)[0] ?? '');

const componentMenus = computed<TreeMenuOptionData[]>(() =>
  menuData
    .filter(group => group.items.length > 0)
    .map(group => ({
      label: t(`${group.i18n}`),
      value: group.value,
      children: group.items.map(item => ({
        label: pascalCase(item),
        value: kebabCase(item),
        to: localizedTo(`/components/${kebabCase(item)}`),
        tag: newlyComponentKeys.includes(item) ? '🎉new' : undefined
      }))
    }))
);

const uiXComponentMenus = computed<TreeMenuOptionData[]>(() =>
  uiXMenuData.map(group => ({
    label: t(`${group.i18n}`),
    value: group.value,
    children: group.items.map(item => ({
      label: pascalCase(item),
      value: item,
      to: localizedTo(`/ui-x/${item}`),
      tag: uiXNewlyComponentKeys.includes(item) ? '🎉new' : undefined
    }))
  }))
);

const adminComponentMenus = computed<TreeMenuOptionData[]>(() =>
  adminMenuData.map(group => ({
    label: t(`${group.i18n}`),
    value: group.value,
    children: group.items.map(item => ({
      label: pascalCase(item),
      value: item,
      to: localizedTo(`/admin/${item}`),
      tag: adminNewlyComponentKeys.includes(item) ? '🎉new' : undefined
    }))
  }))
);

const chartComponentMenus = computed<TreeMenuOptionData[]>(() =>
  chartMenuData.map(group => ({
    label: t(`${group.i18n}`),
    value: group.value,
    children: group.items.map(item => ({
      label: pascalCase(item),
      value: item,
      to: localizedTo(`/chart/${item}`),
      tag: chartNewlyComponentKeys.includes(item) ? '🎉new' : undefined
    }))
  }))
);

const overviewMenus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('layout.header.getting_started'),
    value: 'overview',
    icon: 'lucide:rocket',
    children: [
      {
        label: t('sidebar.installation'),
        value: 'installation',
        to: localizedTo('/overview/installation')
      },
      {
        label: t('sidebar.introduction'),
        value: 'introduction',
        to: localizedTo('/overview/introduction')
      },
      {
        label: t('sidebar.quick_start'),
        value: 'quick-start',
        to: localizedTo('/overview/quick-start')
      },
      {
        label: t('sidebar.theming'),
        value: 'theming',
        to: localizedTo('/overview/theming')
      },
      {
        label: t('sidebar.llms'),
        value: 'llms',
        to: localizedTo('/overview/llms')
      },
      {
        label: t('sidebar.skills'),
        value: 'skills',
        to: localizedTo('/overview/skills')
      },
      {
        label: t('sidebar.cli'),
        value: 'cli',
        to: localizedTo('/sbean')
      }
    ]
  }
]);

const componentsMenus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('layout.header.components'),
    value: 'components',
    icon: 'lucide:layout-grid',
    children: [
      {
        label: t('components.catalog.title'),
        value: componentsOverviewValue,
        to: localizedTo('/components')
      },
      ...componentMenus.value
    ]
  }
]);

const uiXMenus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('layout.header.ui_x'),
    value: 'ui-x',
    icon: 'lucide:sparkles',
    children: [
      {
        label: t('ui_x.catalog.title'),
        value: 'ui-x-overview',
        to: localizedTo('/ui-x')
      },
      ...uiXComponentMenus.value
    ]
  }
]);

const adminMenus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('layout.header.admin'),
    value: 'admin',
    icon: 'lucide:layout-dashboard',
    children: [
      {
        label: t('admin.catalog.title'),
        value: 'admin-overview',
        to: localizedTo('/admin')
      },
      ...adminComponentMenus.value
    ]
  }
]);

const chartMenus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('layout.header.chart'),
    value: 'chart',
    icon: 'lucide:bar-chart-3',
    children: [
      {
        label: t('chart.catalog.title'),
        value: 'chart-overview',
        to: localizedTo('/chart')
      },
      ...chartComponentMenus.value
    ]
  }
]);

// headless docs are not written yet (D8) — sidebar shows only the placeholder entry
const headlessMenus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('layout.header.headless'),
    value: 'headless',
    icon: 'lucide:code-xml',
    children: [
      {
        label: t('headless.catalog.title'),
        value: 'headless-overview',
        to: localizedTo('/headless')
      }
    ]
  }
]);

const menus = computed<TreeMenuOptionData[]>(() => {
  if (section.value === 'overview') {
    return overviewMenus.value;
  }

  if (section.value === 'components') {
    return componentsMenus.value;
  }

  if (section.value === 'ui-x') {
    return uiXMenus.value;
  }

  if (section.value === 'admin') {
    return adminMenus.value;
  }

  if (section.value === 'chart') {
    return chartMenus.value;
  }

  if (section.value === 'headless') {
    return headlessMenus.value;
  }

  return [];
});

watchEffect(() => {
  const [dir, value] = barePath(route.path).split('/').filter(Boolean);

  if (dir && !value) {
    const valueMap: Record<string, string> = {
      overview: 'installation',
      components: componentsOverviewValue,
      'ui-x': 'ui-x-overview',
      admin: 'admin-overview',
      chart: 'chart-overview',
      headless: 'headless-overview'
    };

    selected.value = valueMap[dir] || '';

    return;
  }

  selected.value = value || '';
});
</script>

<template>
  <div class="max-h-full overflow-auto md:border md:border-border/50 md:dark:border-border md:rounded-xl">
    <STreeMenu
      v-model:expanded="expanded"
      :model-value="selected"
      :items="menus"
      :indent="4"
      @update:model-value="emit('select')"
    />
  </div>
</template>
