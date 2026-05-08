<script setup lang="ts">
import Button from '../button/button.vue';
import Icon from '../_icon/icon.vue';
import { useLayoutRootContext, useLayoutUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { LayoutTriggerProps } from './types';

defineOptions({
  name: 'LayoutTrigger'
});

const props = defineProps<LayoutTriggerProps>();
const { open, toggleSidebar } = useLayoutRootContext('LayoutTrigger');
const messages = useLocaleMessages();

const cls = useLayoutUi('trigger');
</script>

<template>
  <Button
    v-bind="props"
    :class="cls"
    :aria-label="messages.layout.toggleSidebar"
    data-sidebar="trigger"
    @click="toggleSidebar"
  >
    <slot :open="open">
      <Icon :icon="open ? 'lucide:panel-right' : 'lucide:panel-left'" />
    </slot>
  </Button>
</template>
