<script setup lang="ts">
import { computed } from 'vue';
import type { DataOrientation, NavigationMenuOptionData } from '@soybeanjs/ui';

interface Props {
  orientation?: DataOrientation;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
});

const { t } = useI18n();

const menus = computed<NavigationMenuOptionData[]>(() => [
  {
    value: 'docs',
    label: t('layout.header.docs'),
    icon: 'lucide:book-open',
    linkProps: {
      to: '/overview',
      activeClass: 'text-primary font-semibold dark:text-primary'
    }
  },
  {
    value: 'components',
    label: t('layout.header.components'),
    icon: 'lucide:layout-grid',
    linkProps: {
      to: '/components',
      activeClass: 'text-primary font-semibold dark:text-primary'
    }
  }
]);
</script>

<template>
  <SNavigationMenu
    :items="menus"
    :ui="{ list: props.orientation === 'vertical' ? 'flex-col items-start' : 'flex-row' }"
  />
</template>
