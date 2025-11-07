<script setup lang="ts">
import { SCard } from '@ui';
import DemoSelectBase from './base.vue';
import DemoSelectDefaultValue from './default-value.vue';
import DemoSelectDisabled from './disabled.vue';
import DemoSelectSeparator from './separator.vue';
import DemoSelectGroup from './group.vue';
import DemoSelectMultiple from './multiple.vue';
</script>

<template>
  <SCard title="Select" :ui="{ content: 'flex-c gap-3' }">
    <DemoSelectBase />
    <DemoSelectDefaultValue />
    <DemoSelectDisabled />
    <DemoSelectSeparator />
    <DemoSelectGroup />
    <DemoSelectMultiple />
  </SCard>
</template>
