<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { toKebabCase, toPascalCase } from '@soybeanjs/headless/shared';
import type { TreeMenuOptionData } from '@soybeanjs/ui';
import { components } from '../../../src/constants/components';

type Emits = {
  select: [];
};

const emit = defineEmits<Emits>();

const route = useRoute();

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

const menus: TreeMenuOptionData[] = [
  {
    label: 'Overview',
    value: 'overview',
    icon: 'lucide:home',
    children: [
      {
        label: 'Introduction',
        value: 'introduction',
        to: '/overview/introduction'
      },
      {
        label: 'Quick Start',
        value: 'quick-start',
        to: '/overview/quick-start'
      }
    ]
  },
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:layout-grid',
    children: componentMenus
  }
];

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
