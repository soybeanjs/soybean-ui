<script setup lang="ts">
import { Button, Card } from '@ui';
import type { ThemeSize } from '@theme';

defineOptions({
  name: 'DemoButtonSize'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <Card title="Size" split>
    <div class="flex flex-wrap gap-3">
      <Button v-for="size in sizes" :key="size" color="success" variant="pure" :size="size">{{ size }}</Button>
    </div>
  </Card>
</template>
