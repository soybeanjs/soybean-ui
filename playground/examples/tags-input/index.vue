<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoTagsInputBasic from './basic.vue';
import DemoTagsInputDisabled from './disabled.vue';
import DemoTagsInputObjectValue from './object-value.vue';
import DemoTagsInputClear from './clear.vue';
</script>

<template>
  <SCard title="TagsInput" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTagsInputBasic />
    <DemoTagsInputDisabled />
    <DemoTagsInputObjectValue />
    <DemoTagsInputClear />
  </SCard>
</template>
