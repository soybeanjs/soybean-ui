<script setup lang="ts">
import { computed } from 'vue';
import {
  provideNavigationMenuRootContext,
  useNavigationMenuRootContext,
  useNavigationMenuThemeContext
} from './context';
import type { NavigationMenuSubListProps } from './types';

defineOptions({
  name: 'NavigationMenuSubList'
});

defineProps<NavigationMenuSubListProps>();

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.subList);

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
