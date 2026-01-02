<script setup lang="ts">
import { useAttrs } from 'vue';
import { useNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuListProps } from './types';

defineOptions({
  name: 'NavigationMenuList',
  inheritAttrs: false
});

defineProps<NavigationMenuListProps>();

const attrs = useAttrs();

const { setIndicatorTrackElement } = useNavigationMenuRootContext('NavigationMenuList');

const cls = useNavigationMenuUi('list');
</script>

<template>
  <div :ref="setIndicatorTrackElement" style="position: relative">
    <ul v-bind="attrs" :class="cls">
      <slot />
    </ul>
  </div>
</template>
