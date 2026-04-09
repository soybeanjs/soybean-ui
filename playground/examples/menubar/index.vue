<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoMenubarBasic from './basic.vue';
import DemoMenubarCheckbox from './checkbox.vue';
import DemoMenubarRadio from './radio.vue';
</script>

<template>
  <SCard title="Menubar" split :ui="{ content: 'flex-c gap-4' }">
    <DemoMenubarBasic />
    <DemoMenubarCheckbox />
    <DemoMenubarRadio />
  </SCard>
</template>
