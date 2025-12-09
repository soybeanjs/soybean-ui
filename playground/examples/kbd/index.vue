<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoKbdBase from './base.vue';
import DemoKbdSize from './size.vue';
import DemoKbdVariant from './variant.vue';
</script>

<template>
  <SCard title="Kbd" :ui="{ content: 'flex-c gap-4' }">
    <DemoKbdBase />
    <DemoKbdSize />
    <DemoKbdVariant />
  </SCard>
</template>
