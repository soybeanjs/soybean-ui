<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { toKebabCase, toPascalCase } from '@soybeanjs/headless/shared';
import type { TreeMenuOptionData } from '@soybeanjs/ui';
import { components } from '../../../src/constants/components';

type Emits = {
  select: [];
};

const emit = defineEmits<Emits>();

const route = useRoute();
const { t } = useI18n();

const expanded = ref<string[]>([]);

const selected = ref<string>('');

const excludes: string[] = ['configProvider', 'label', 'icon', 'menu'];

const componentMenus = Object.keys(components)
  .filter(key => !excludes.includes(key))
  .map(
    key =>
      ({
        label: toPascalCase(key),
        value: toKebabCase(key),
        to: `/components/${toKebabCase(key)}`
      }) satisfies TreeMenuOptionData
  );

const menus = computed<TreeMenuOptionData[]>(() => [
  {
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
        label: t('sidebar.quick-start'),
        value: 'quick-start',
        to: '/overview/quick-start'
      }
    ]
  },
  {
    label: t('sidebar.components'),
    value: 'components',
    icon: 'lucide:layout-grid',
    children: componentMenus
  }
]);

watchEffect(() => {
  const [dir, value] = route.path.split('/').filter(Boolean);

  if (dir) {
    expanded.value = [dir];
  }

  if (value) {
    selected.value = value;
  }
});
</script>

<template>
  <STreeMenu v-model:expanded="expanded" :model-value="selected" :items="menus" @update:model-value="emit('select')" />
</template>
