<script setup lang="ts">
import type { TreeMenuOptionData } from '@soybeanjs/ui';
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import {
  menuData,
  newlyComponentKeys,
  uiXMenuData,
  uiXNewlyComponentKeys,
  adminMenuData,
  adminNewlyComponentKeys,
  chartMenuData,
  chartNewlyComponentKeys
} from '../constants/menus';

type Emits = {
  select: [];
};

const emit = defineEmits<Emits>();

const route = useRoute();
const { t } = useI18n();

const expanded = ref<string[]>([]);

const selected = ref<string>('');

const componentsOverviewValue = 'components-overview';

const section = computed(() => route.path.split('/').filter(Boolean)[0] ?? '');

const componentMenus = computed<TreeMenuOptionData[]>(() =>
  menuData.map(group => ({
    label: t(`${group.i18n}`),
    value: group.value,
    children: group.items.map(item => ({
      label: pascalCase(item),
      value: kebabCase(item),
      to: `/components/${kebabCase(item)}`,
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
      value: kebabCase(item),
      to: `/ui-x/${kebabCase(item)}`,
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
      value: kebabCase(item),
      to: `/admin/${kebabCase(item)}`,
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
      value: kebabCase(item),
      to: `/chart/${kebabCase(item)}`,
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
        to: '/overview/installation'
      },
      {
        label: t('sidebar.introduction'),
        value: 'introduction',
        to: '/overview/introduction'
      },
      {
        label: t('sidebar.quick_start'),
        value: 'quick-start',
        to: '/overview/quick-start'
      },
      {
        label: t('sidebar.theming'),
        value: 'theming',
        to: '/overview/theming'
      },
      {
        label: t('sidebar.llms'),
        value: 'llms',
        to: '/overview/llms'
      },
      {
        label: t('sidebar.skills'),
        value: 'skills',
        to: '/overview/skills'
      },
      {
        label: t('sidebar.cli'),
        value: 'cli',
        to: '/sbean'
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
        to: '/components'
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
        to: '/ui-x'
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
        to: '/admin'
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
        to: '/chart'
      },
      ...chartComponentMenus.value
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

  return [];
});

watchEffect(() => {
  const [dir, value] = route.path.split('/').filter(Boolean);

  if (dir && !value) {
    const valueMap: Record<string, string> = {
      overview: 'installation',
      components: componentsOverviewValue,
      'ui-x': 'ui-x-overview',
      admin: 'admin-overview',
      chart: 'chart-overview'
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
