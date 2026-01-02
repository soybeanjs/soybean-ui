<script setup lang="ts">
import { useTreeMenuUi } from '@soybeanjs/headless';

defineOptions({
  name: 'STreeMenuStyledItem'
});

const ui = useTreeMenuUi();
</script>

<template>
  <li :class="ui.item">
    <button :class="ui.button">
      <slot />
    </button>
  </li>
</template>
