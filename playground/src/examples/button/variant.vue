<script setup lang="ts">
import { Button, Card } from '@ui';
import type { ButtonVariant } from '@variants/button';

defineOptions({
  name: 'DemoButtonColor'
});

const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
</script>

<template>
  <Card title="Variant" split>
    <div class="flex flex-wrap gap-3">
      <Button v-for="variant in variants" :key="variant" color="destructive" :variant="variant">{{ variant }}</Button>
    </div>
  </Card>
</template>
