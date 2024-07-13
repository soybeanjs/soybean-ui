<script setup lang="ts">
import { Button } from '@soybean-unify/shadcn-ui';

defineOptions({
  name: 'ButtonDemo'
});
</script>

<template>
  <div class="pb-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="destructive">Destructive</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="info">Info</Button>
  </div>
  <div class="pb-12px text-18px">Variant</div>
  <div class="flex flex-wrap gap-12px">
    <Button variant="outline">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button color="secondary" variant="outline">Outlined</Button>
    <Button color="secondary" variant="ghost">Ghost</Button>
    <Button color="secondary" variant="link">Link</Button>
    <Button color="destructive" variant="outline">Outlined</Button>
    <Button color="destructive" variant="ghost">ghost</Button>
    <Button color="destructive" variant="link">Link</Button>
  </div>
  <div class="pb-12px text-18px">Size</div>
  <div class="flex flex-wrap gap-12px">
    <Button size="xs">xs button</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
</template>
