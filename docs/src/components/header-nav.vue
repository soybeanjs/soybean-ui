<script setup lang="ts">
import type { DataOrientation, NavigationMenuOptionData } from '@soybeanjs/ui';

interface Props {
  orientation?: DataOrientation;
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
});

const route = useRoute();
const { t } = useI18n();

interface HeaderNavItem extends NavigationMenuOptionData {
  isActive: boolean;
}

const menus = computed<HeaderNavItem[]>(() => [
  {
    value: 'getting-started',
    label: t('layout.header.getting_started'),
    icon: 'lucide:rocket',
    to: '/overview/quick-start',
    isActive: route.path.startsWith('/overview')
  },
  {
    value: 'components',
    label: t('layout.header.components'),
    icon: 'lucide:layout-grid',
    to: '/components',
    isActive: route.path.startsWith('/components')
  },
  {
    value: 'releases',
    label: t('layout.header.releases'),
    icon: 'lucide:git-commit-horizontal',
    to: '/releases',
    isActive: route.path.startsWith('/releases')
  }
]);
</script>

<template>
  <nav :class="orientation === 'vertical' ? 'flex flex-col items-stretch gap-2' : 'flex w-fit items-center gap-2'">
    <SLink
      v-for="item in menus"
      :key="item.value"
      :to="item.to"
      :aria-current="item.isActive ? 'page' : undefined"
      class="flex items-center gap-2 rounded-md px-2 py-1.5 font-medium outline-none decoration-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:ring-offset-3"
      :class="item.isActive ? 'text-primary font-semibold bg-accent' : ''"
    >
      <SIcon :icon="item.icon" class="text-base" />
      <span>{{ item.label }}</span>
    </SLink>
  </nav>
</template>
