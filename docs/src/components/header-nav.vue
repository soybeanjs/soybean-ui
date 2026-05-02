<script setup lang="ts">
import type { DataOrientation, NavigationMenuOptionData } from '@soybeanjs/ui';

interface Props {
  orientation?: DataOrientation;
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
});

const { t } = useI18n();

const menus = computed<NavigationMenuOptionData[]>(() => [
  {
    value: 'getting-started',
    label: t('layout.header.getting_started'),
    icon: 'lucide:rocket',
    to: '/overview/quick-start'
  },
  {
    value: 'components',
    label: t('layout.header.components'),
    icon: 'lucide:layout-grid',
    to: '/components'
  },
  {
    value: 'releases',
    label: t('layout.header.releases'),
    icon: 'lucide:git-commit-horizontal',
    to: '/releases'
  }
]);
</script>

<template>
  <SNavigationMenu
    :items="menus"
    :orientation="orientation"
    :link-props="{ activeClass: 'text-primary! font-semibold dark:text-primary! bg-transparent!' }"
    class="w-fit"
  />
</template>
