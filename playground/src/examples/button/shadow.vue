<script setup lang="ts">
import { Button, Card } from '@ui';
import type { ButtonShadow } from '@variants/button';

defineOptions({
  name: 'DemoButtonShadow'
});

const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];
</script>

<template>
  <Card title="Shadow" split>
    <div class="flex flex-wrap gap-3">
      <Button v-for="item in shadows" :key="item" variant="pure" :shadow="item">
        {{ item }}
      </Button>
    </div>
  </Card>
</template>
