<script setup lang="ts">
import { useLayoutRootContext, useLayoutUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { LayoutRailProps } from './types';

defineOptions({
  name: 'LayoutRail'
});

defineProps<LayoutRailProps>();

const { toggleSidebar } = useLayoutRootContext('LayoutRail');
const messages = useLocaleMessages();

const cls = useLayoutUi('rail');
</script>

<template>
  <button
    :class="cls"
    data-soybean-layout-rail
    data-sidebar="rail"
    :aria-label="messages.layout.toggleSidebar"
    :tabindex="-1"
    :title="messages.layout.toggleSidebar"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>
