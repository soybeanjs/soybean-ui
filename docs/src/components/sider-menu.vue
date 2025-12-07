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

const menus: TreeMenuOptionData[] = [
  {
    label: 'Overview',
    value: 'overview',
    icon: 'lucide:home',
    children: [
      {
        label: 'Introduction',
        value: 'introduction',
        linkProps: {
          to: '/overview/introduction'
        }
      },
      {
        label: 'Quick Start',
        value: 'quick-start',
        linkProps: {
          to: '/overview/quick-start'
        }
      }
    ]
  },
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:layout-grid',
    children: Object.keys(components).map(key => ({
      label: toPascalCase(key),
      value: toKebabCase(key),
      linkProps: {
        to: `/components/${toKebabCase(key)}`
      }
    }))
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
