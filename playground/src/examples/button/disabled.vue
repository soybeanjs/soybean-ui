<script setup lang="ts">
import { Button, Card } from '@ui';

defineOptions({
  name: 'DemoButtonDisabled'
});
</script>

<template>
  <Card title="Disabled" split>
    <div class="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
    </div>
  </Card>
</template>
