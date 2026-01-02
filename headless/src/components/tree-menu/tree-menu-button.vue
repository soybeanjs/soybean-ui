<script setup lang="ts">
import { Primitive } from '../primitive';
import { useTreeMenuItemContext, useTreeMenuUi } from './context';
import type { TreeMenuButtonProps } from './types';

defineOptions({
  name: 'TreeMenuButton'
});

const props = withDefaults(defineProps<TreeMenuButtonProps>(), {
  as: 'button'
});

const cls = useTreeMenuUi('button');

const { isActive, onActive } = useTreeMenuItemContext('TreeMenuButton');

const onClick = () => {
  if (props.disabledActive) return;

  onActive();
};
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :data-active="isActive" @click="onClick">
    <slot />
  </Primitive>
</template>
