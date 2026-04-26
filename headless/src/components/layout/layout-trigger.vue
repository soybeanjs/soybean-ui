<script setup lang="ts">
import { Primitive } from '../primitive';
import { useLayoutRootContext, useLayoutUi } from './context';
import Icon from '../_icon/icon.vue';
import type { LayoutTriggerProps } from './types';

defineOptions({
  name: 'LayoutTrigger'
});

withDefaults(defineProps<LayoutTriggerProps>(), {
  as: 'button'
});

const { open, toggleSidebar } = useLayoutRootContext('LayoutTrigger');

const cls = useLayoutUi('trigger');
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    type="button"
    aria-label="Toggle Sidebar"
    data-sidebar="trigger"
    @click="toggleSidebar"
  >
    <slot :open="open">
      <Icon :icon="open ? 'lucide:panel-right' : 'lucide:panel-left'" />
    </slot>
  </Primitive>
</template>
