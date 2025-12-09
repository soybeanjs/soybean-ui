<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoLinkBase from './base.vue';
import DemoLinkHref from './href.vue';
</script>

<template>
  <SCard title="Link" split :ui="{ content: 'flex-c gap-4' }">
    <DemoLinkBase />
    <DemoLinkHref />
  </SCard>
</template>
