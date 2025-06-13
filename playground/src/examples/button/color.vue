<script setup lang="ts">
import { Button, Card } from '@ui';
import type { ThemeColor } from '@theme';

defineOptions({
  name: 'DemoButtonColor'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <Card title="Color" split>
    <div class="flex flex-wrap gap-3">
      <Button v-for="color in colors" :key="color" :color="color">{{ color }}</Button>
    </div>
  </Card>
</template>
