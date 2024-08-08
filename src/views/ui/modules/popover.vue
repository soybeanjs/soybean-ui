<script setup lang="ts">
import { SButton, SPopover } from '@soybean-unify/ui';

defineOptions({
  name: 'UiPopover'
});
</script>

<template>
  <SPopover>
    <template #trigger>
      <SButton>Open Popover</SButton>
    </template>
    <p>Popover content</p>
  </SPopover>
</template>

<style scoped></style>
