<script setup lang="ts">
import { Badge } from '@su/shadcn-ui';

defineOptions({
  name: 'BadgeDemo'
});
</script>

<template>
  <div class="flex gap-12px">
    <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="destructive">Destructive</Badge>
  </div>
</template>
