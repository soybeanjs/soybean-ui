<script setup lang="ts">
import { useTreeMenuThemeContext } from './context';
import { treeMenuCssVars } from './shared';

defineOptions({
  name: 'STreeMenuItemWrapper'
});

const { ui } = useTreeMenuThemeContext('STreeMenuItemWrapper');

const style = `${treeMenuCssVars.indent}: 0`;
</script>

<template>
  <li :class="ui.item" data-level="0" :style="style">
    <div :class="ui.itemContent">
      <slot />
    </div>
  </li>
</template>
