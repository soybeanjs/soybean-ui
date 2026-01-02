<script setup lang="ts">
import { useAttrs } from 'vue';
import { useLayoutRootContext, useLayoutUi } from './context';
import LayoutMobile from './layout-mobile.vue';
import type { LayoutSidebarProps } from './types';

defineOptions({
  name: 'LayoutSidebar',
  inheritAttrs: false
});

defineProps<LayoutSidebarProps>();

const attrs = useAttrs();

const { isMobile } = useLayoutRootContext('LayoutSidebar');

const ui = useLayoutUi();
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
