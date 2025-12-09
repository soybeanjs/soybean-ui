<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTagColor from './color.vue';
import DemoTagVariant from './variant.vue';
import DemoTagShape from './shape.vue';
import DemoTagSize from './size.vue';
import DemoTagClosable from './closable.vue';
import DemoTagSlot from './slot.vue';
</script>

<template>
  <SCard title="Tag" :ui="{ content: 'flex-c gap-4' }">
    <DemoTagColor />
    <DemoTagVariant />
    <DemoTagShape />
    <DemoTagSize />
    <DemoTagClosable />
    <DemoTagSlot />
  </SCard>
</template>
