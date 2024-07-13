<script setup lang="ts">
import { Button } from '@soybean-unify/shadcn-ui';

defineOptions({
  name: 'ButtonDemo'
});
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <Button color="primary">Primary</Button>
    <Button color="destructive">Destructive</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="info">Info</Button>
    <Button color="secondary">Secondary</Button>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-col-stretch gap-12px">
    <div class="flex flex-wrap gap-12px">
      <Button variant="solid">Solid</Button>
      <Button variant="pure">Pure</Button>
      <Button variant="outline">Outlined</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
    </div>
    <div class="flex flex-wrap gap-12px">
      <Button color="destructive" variant="solid">Solid</Button>
      <Button color="destructive" variant="pure">Pure</Button>
      <Button color="destructive" variant="outline">Outlined</Button>
      <Button color="destructive" variant="ghost">Ghost</Button>
      <Button color="destructive" variant="text">Text</Button>
      <Button color="destructive" variant="link">Link</Button>
    </div>
    <div class="flex flex-wrap gap-12px">
      <Button color="success" variant="solid">Solid</Button>
      <Button color="success" variant="pure">Pure</Button>
      <Button color="success" variant="outline">Outlined</Button>
      <Button color="success" variant="ghost">Ghost</Button>
      <Button color="success" variant="text">Text</Button>
      <Button color="success" variant="link">Link</Button>
    </div>
    <div class="flex flex-wrap gap-12px">
      <Button color="warning" variant="solid">Solid</Button>
      <Button color="warning" variant="pure">Pure</Button>
      <Button color="warning" variant="outline">Outlined</Button>
      <Button color="warning" variant="ghost">Ghost</Button>
      <Button color="warning" variant="text">Text</Button>
      <Button color="warning" variant="link">Link</Button>
    </div>
    <div class="flex flex-wrap gap-12px">
      <Button color="info" variant="solid">Solid</Button>
      <Button color="info" variant="pure">Pure</Button>
      <Button color="info" variant="outline">Outlined</Button>
      <Button color="info" variant="ghost">Ghost</Button>
      <Button color="info" variant="text">Text</Button>
      <Button color="info" variant="link">Link</Button>
    </div>
    <div class="flex flex-wrap gap-12px">
      <Button color="secondary" variant="solid">Solid</Button>
      <Button color="secondary" variant="pure">Pure</Button>
      <Button color="secondary" variant="outline">Outlined</Button>
      <Button color="secondary" variant="ghost">Ghost</Button>
      <Button color="secondary" variant="text">Text</Button>
      <Button color="secondary" variant="link">Link</Button>
    </div>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-wrap gap-12px">
    <Button size="xs">xs button</Button>
    <Button color="destructive" variant="pure" size="sm">Small</Button>
    <Button color="success" variant="outline" size="md">Medium</Button>
    <Button color="warning" variant="ghost" size="lg">Large</Button>
    <Button color="info" variant="outline" size="icon">Icon</Button>
  </div>
</template>
