<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { extractLocaleFromPath } from 'ubean/client';
import type { NavMenuOptionData, SNavMenu } from '@soybeanjs/ui';

interface Props {
  orientation?: 'horizontal' | 'vertical';
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
});

const route = useRoute();
const { t } = useI18n();

const menus = computed<NavMenuOptionData[]>(() => {
  const path = extractLocaleFromPath(route.path).pathWithoutLocale;

  const items: NavMenuOptionData[] = [
    {
      value: 'getting-started',
      label: t('layout.header.getting_started'),
      icon: 'lucide:rocket',
      to: '/overview/installation',
      selected: path.startsWith('/overview')
    },
    {
      value: 'components',
      label: t('layout.header.components'),
      icon: 'lucide:layout-grid',
      to: '/components',
      selected: path.startsWith('/components')
    },
    {
      value: 'ui-x',
      label: t('layout.header.ui_x'),
      icon: 'lucide:sparkles',
      to: '/ui-x',
      selected: path.startsWith('/ui-x')
    },
    {
      value: 'admin',
      label: t('layout.header.admin'),
      icon: 'lucide:layout-dashboard',
      to: '/admin',
      selected: path.startsWith('/admin')
    },
    {
      value: 'chart',
      label: t('layout.header.chart'),
      icon: 'lucide:bar-chart-3',
      to: '/chart',
      selected: path.startsWith('/chart')
    },
    {
      value: 'playground',
      label: t('layout.header.playground'),
      icon: 'lucide:flask-conical',
      to: '/playground',
      selected: path.startsWith('/playground')
    },
    {
      value: 'releases',
      label: t('layout.header.releases'),
      icon: 'lucide:git-commit-horizontal',
      to: '/releases',
      selected: path.startsWith('/releases')
    }
  ];

  return items;
});
</script>

<template>
  <SNavMenu :orientation="orientation" :items="menus" />
</template>
