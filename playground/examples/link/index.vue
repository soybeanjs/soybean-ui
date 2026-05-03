<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoLinkBasic from './basic.vue';
import DemoLinkHref from './href.vue';
</script>

<template>
  <SCard title="Link" split :ui="{ content: 'flex-c gap-4' }">
    <DemoLinkBasic />
    <DemoLinkHref />
  </SCard>
</template>
