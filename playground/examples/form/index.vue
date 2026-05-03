<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoFormZod from './zod.vue';
import DemoFormValibot from './valibot.vue';
import DemoFormBasic from './basic.vue';
</script>

<template>
  <SCard title="Form" split :ui="{ content: 'flex-c gap-4' }">
    <DemoFormBasic />
    <DemoFormZod />
    <DemoFormValibot />
  </SCard>
</template>
