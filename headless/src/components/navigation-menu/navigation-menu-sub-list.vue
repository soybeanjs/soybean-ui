<script setup lang="ts">
import { provideNavigationMenuRootContext, useNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuSubListProps } from './types';

defineOptions({
  name: 'NavigationMenuSubList'
});

defineProps<NavigationMenuSubListProps>();

const cls = useNavigationMenuUi('subList');

const rootContext = useNavigationMenuRootContext('NavigationMenuSubList');

provideNavigationMenuRootContext({
  ...rootContext,
  isRoot: false
});
</script>

<template>
  <ul :class="cls">
    <slot />
  </ul>
</template>
