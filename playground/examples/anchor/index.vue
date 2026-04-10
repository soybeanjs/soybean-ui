<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAnchorBasic from './basic.vue';
import DemoAnchorColor from './color.vue';
import DemoAnchorSize from './size.vue';
import DemoAnchorSticky from './sticky.vue';
import DemoAnchorCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Anchor" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAnchorBasic />
    <DemoAnchorColor />
    <DemoAnchorSize />
    <DemoAnchorSticky />
    <DemoAnchorCustomStyling />
  </SCard>
</template>
