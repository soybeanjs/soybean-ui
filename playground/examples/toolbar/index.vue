<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoToolbarBasic from './basic.vue';
import DemoToolbarLink from './link.vue';
import DemoToolbarToggleGroup from './toggle-group.vue';
import DemoToolbarVertical from './vertical.vue';
</script>

<template>
  <SCard title="Toolbar" split :ui="{ content: 'flex-c gap-4' }">
    <DemoToolbarBasic />
    <DemoToolbarLink />
    <DemoToolbarToggleGroup />
    <DemoToolbarVertical />
  </SCard>
</template>
