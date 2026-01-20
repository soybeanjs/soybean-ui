<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { toKebabCase, toPascalCase } from '@soybeanjs/headless/shared';
import type { TreeMenuOptionData } from '@soybeanjs/ui';
import { snakeCase } from 'es-toolkit';
import { menuData } from '../constants/menus';

type Emits = {
  select: [];
};

const emit = defineEmits<Emits>();

const route = useRoute();
const { t } = useI18n();

const expanded = ref<string[]>([]);

const selected = ref<string>('');

const componentMenus = computed<TreeMenuOptionData[]>(() =>
  menuData.map(group => ({
    label: t(`sidebar.${snakeCase(group.label)}`),
    value: group.label,
    children: group.items.map(item => ({
      label: toPascalCase(item),
      value: toKebabCase(item),
      to: `/components/${toKebabCase(item)}`
    }))
  }))
);

const menus = computed<TreeMenuOptionData[]>(() => [
  {
    isGroup: true,
    label: t('sidebar.overview'),
    value: 'overview',
    icon: 'lucide:home',
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
      }
    ]
  },
  {
    isGroup: true,
    label: t('sidebar.components'),
    value: 'components',
    icon: 'lucide:layout-grid',
    children: componentMenus.value
  }
]);

watchEffect(() => {
  const [dir, value] = route.path.split('/').filter(Boolean);

  if (dir) {
    if (dir === 'components') {
      // Find which group the current component belongs to
      const group = menuData.find(g => g.items.some(item => toKebabCase(item) === value));

      if (group) {
        expanded.value = ['components', group.label];
      } else {
        expanded.value = ['components'];
      }
    } else {
      expanded.value = [dir];
    }
  }

  if (value) {
    selected.value = value;
  }
});
</script>

<template>
  <STreeMenu v-model:expanded="expanded" :model-value="selected" :items="menus" @update:model-value="emit('select')" />
</template>
