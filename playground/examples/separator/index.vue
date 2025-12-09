<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSeparatorOrientation from './orientation.vue';
import DemoSeparatorAlign from './align.vue';
import DemoSeparatorBorder from './border.vue';
</script>

<template>
  <SCard title="Separator" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSeparatorOrientation />
    <DemoSeparatorAlign />
    <DemoSeparatorBorder />
  </SCard>
</template>
