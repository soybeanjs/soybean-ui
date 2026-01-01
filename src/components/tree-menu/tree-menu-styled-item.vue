<script setup lang="ts">
import { useTreeMenuThemeContext } from '@soybeanjs/headless';

defineOptions({
  name: 'STreeMenuStyledItem'
});

const ui = useTreeMenuThemeContext('TreeMenuStyledItem');
</script>

<template>
  <li :class="ui.item">
    <button :class="ui.button">
      <slot />
    </button>
  </li>
</template>
