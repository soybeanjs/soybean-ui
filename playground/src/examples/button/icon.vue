<script setup lang="ts">
import { ButtonIcon, Card } from '@ui';
</script>

<template>
  <Card title="Icon" split>
    <div class="flex flex-wrap gap-3">
      <ButtonIcon icon="lucide:skip-back" />
      <ButtonIcon icon="lucide:skip-forward" />
      <ButtonIcon icon="lucide:pause" />
    </div>
  </Card>
</template>
