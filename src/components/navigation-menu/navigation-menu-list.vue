<script setup lang="ts">
import { computed } from 'vue';
import { useNavigationMenuRootContext, useNavigationMenuThemeContext } from './context';
import type { NavigationMenuListProps } from './types';

defineOptions({
  name: 'NavigationMenuList',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuListProps>();

const { isRoot, orientation, setIndicatorTrackElement } = useNavigationMenuRootContext('NavigationMenuList');

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => (isRoot ? themeContext?.ui?.value?.list : themeContext?.ui?.value?.subList));
</script>

<template>
  <div :ref="setIndicatorTrackElement" style="position: relative">
    <ul v-bind="{ ...props, ...$attrs }" :class="cls" :data-orientation="orientation">
      <slot />
    </ul>
  </div>
</template>
