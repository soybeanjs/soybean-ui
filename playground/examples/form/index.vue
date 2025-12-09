<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoFormZod from './zod.vue';
import DemoFormValibot from './valibot.vue';
</script>

<template>
  <SCard title="Form" split :ui="{ content: 'flex-c gap-4' }">
    <DemoFormZod />
    <DemoFormValibot />
  </SCard>
</template>
