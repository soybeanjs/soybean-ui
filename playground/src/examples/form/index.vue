<script setup lang="ts">
import { SCard } from '@ui';
import DemoFormZod from './zod.vue';
import DemoFormValibot from './valibot.vue';
</script>

<template>
  <SCard title="Form" :ui="{ content: 'flex-c gap-3' }">
    <DemoFormZod />
    <DemoFormValibot />
  </SCard>
</template>
