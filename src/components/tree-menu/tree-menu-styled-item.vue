<script setup lang="ts">
import { useTreeMenuUi } from '@soybeanjs/headless';

defineOptions({
  name: 'STreeMenuStyledItem'
});

const ui = useTreeMenuUi();
</script>

<template>
  <div :class="ui.item">
    <button :class="ui.button">
      <slot />
    </button>
  </div>
</template>
