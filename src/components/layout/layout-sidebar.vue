<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from '../../types';
import { useLayoutRootContext, useLayoutThemeContext } from './context';
import LayoutMobile from './layout-mobile.vue';
import type { LayoutSidebarProps, LayoutThemeSlot } from './types';

defineOptions({
  name: 'LayoutSidebar',
  inheritAttrs: false
});

defineProps<LayoutSidebarProps>();

const attrs = useAttrs();

const { isMobile } = useLayoutRootContext('LayoutSidebar');

const theme = useLayoutThemeContext();

const ui = computed<Partial<Record<LayoutThemeSlot, ClassValue>>>(() => theme?.ui?.value ?? {});
</script>

<template>
  <LayoutMobile v-if="isMobile" v-bind="attrs">
    <slot />
  </LayoutMobile>
  <div v-else :class="ui.sidebarRoot">
    <div :class="ui.sidebarGapHandler"></div>
    <div :class="ui.sidebarWrapper">
      <div v-bind="attrs" :class="ui.sidebar" data-sidebar="sidebar">
        <slot />
      </div>
    </div>
  </div>
</template>
