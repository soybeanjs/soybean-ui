<script setup lang="ts">
import Button from '../button/button.vue';
import { useTreeMenuItemContext, useTreeMenuUi } from './context';
import type { TreeMenuButtonProps } from './types';

defineOptions({
  name: 'TreeMenuButton'
});

const props = defineProps<TreeMenuButtonProps>();

const cls = useTreeMenuUi('button');

const { isActive, onActive } = useTreeMenuItemContext('TreeMenuButton');

const onClick = () => {
  if (props.disabledActive) return;

  onActive();
};
</script>

<template>
  <Button v-bind="props" :class="cls" :data-active="isActive" data-slot="button" @click="onClick">
    <slot />
  </Button>
</template>
