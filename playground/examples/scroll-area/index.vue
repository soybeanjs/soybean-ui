<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoScrollAreaBasic from './basic.vue';
import DemoScrollAreaHorizontal from './horizontal.vue';
import DemoScrollAreaType from './type.vue';
import DemoScrollAreaCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="ScrollArea" split :ui="{ content: 'flex-c gap-4' }">
    <DemoScrollAreaBasic />
    <DemoScrollAreaHorizontal />
    <DemoScrollAreaType />
    <DemoScrollAreaCustomStyling />
  </SCard>
</template>
