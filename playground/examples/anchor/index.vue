<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAnchorBasic from './basic.vue';
import DemoAnchorSize from './size.vue';
import DemoAnchorSticky from './sticky.vue';
import DemoAnchorCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Anchor" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAnchorBasic />
    <DemoAnchorSize />
    <DemoAnchorSticky />
    <DemoAnchorCustomStyling />
  </SCard>
</template>
