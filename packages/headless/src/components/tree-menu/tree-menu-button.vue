<script setup lang="ts">
import { useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import { useTreeMenuItemContext, useTreeMenuUi } from './context';
import type { TreeMenuButtonProps } from './types';

defineOptions({
  name: 'TreeMenuButton'
});

const props = defineProps<TreeMenuButtonProps>();

const forwardedProps = useOmitProps(props, ['disabledActive']);

const cls = useTreeMenuUi('button');

const { isActive, onActive } = useTreeMenuItemContext('TreeMenuButton');

const onClick = () => {
  if (props.disabledActive) return;

  onActive();
};
</script>

<template>
  <Button v-bind="forwardedProps" data-soybean-tree-menu-button :class="cls" :data-active="isActive" @click="onClick">
    <slot />
  </Button>
</template>
