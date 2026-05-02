<script setup lang="ts">
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import type { TreeMenuOptionData } from '@soybeanjs/ui';
import { menuData } from '../constants/menus';

type Emits = {
  select: [];
};

const emit = defineEmits<Emits>();

const route = useRoute();
const { t } = useI18n();

const expanded = ref<string[]>([]);

const selected = ref<string>('');

const newlyComponents = ['pageTabs'];
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
      tag: newlyComponents.includes(item) ? '🎉new' : undefined
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

const menus = computed<TreeMenuOptionData[]>(() => {
  if (section.value === 'overview') {
    return overviewMenus.value;
  }

  if (section.value === 'components') {
    return componentsMenus.value;
  }

  return [];
});

watchEffect(() => {
  const [dir, value] = route.path.split('/').filter(Boolean);

  if (dir) {
    if (dir === 'components') {
      // Find which group the current component belongs to
      const group = menuData.find(g => g.items.some(item => kebabCase(item) === value));

      if (group) {
        expanded.value = ['components', group.value];
      } else {
        expanded.value = ['components'];
      }
    } else {
      expanded.value = [dir];
    }
  }

  if (dir === 'components' && !value) {
    selected.value = componentsOverviewValue;
    return;
  }

  selected.value = value || '';
});
</script>

<template>
  <div class="docs-sidebar-shell">
    <STreeMenu
      v-model:expanded="expanded"
      class="docs-sidebar-menu"
      :model-value="selected"
      :items="menus"
      @update:model-value="emit('select')"
    />
  </div>
</template>
