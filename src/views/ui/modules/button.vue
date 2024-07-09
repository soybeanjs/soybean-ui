<script setup lang="ts">
import { Button } from '@su/shadcn-ui';

defineOptions({
  name: 'ButtonDemo'
});
</script>

<template>
  <div class="flex flex-wrap gap-12px">
    <Button>Button</Button>
    <Button color="info">Button</Button>
    <Button color="success">Button</Button>
    <Button color="warning">Button</Button>
    <Button color="error">Button</Button>
  </div>
</template>
