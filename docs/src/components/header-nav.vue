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
    value: 'docs',
    label: t('layout.header.docs'),
    icon: 'lucide:book-open',
    to: '/overview'
  },
  {
    value: 'components',
    label: t('layout.header.components'),
    icon: 'lucide:layout-grid',
    to: '/components'
  }
]);
</script>

<template>
  <SNavigationMenu
    :items="menus"
    :orientation="orientation"
    :link-props="{ activeClass: 'text-primary! font-semibold dark:text-primary! bg-transparent!' }"
  />
</template>
