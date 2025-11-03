<script setup lang="ts">
import { computed } from 'vue';
import { useNavigationMenuRootContext, useNavigationMenuThemeContext } from './context';
import type { NavigationMenuListProps } from './types';

defineOptions({
  name: 'NavigationMenuList',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuListProps>();

const { setIndicatorTrackElement } = useNavigationMenuRootContext('NavigationMenuList');

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.list);
</script>

<template>
  <div :ref="setIndicatorTrackElement" style="position: relative">
    <ul v-bind="{ ...props, ...$attrs }" :class="cls">
      <slot />
    </ul>
  </div>
</template>
