<script setup lang="ts">
import { SCard } from '@ui';
import DemoSelectBasic from './basic.vue';
import DemoSelectDefaultValue from './default-value.vue';
import DemoSelectDisabled from './disabled.vue';
import DemoSelectSeparator from './separator.vue';
import DemoSelectGroup from './group.vue';
</script>

<template>
  <SCard title="Select" :ui="{ content: 'flex-c gap-3' }">
    <DemoSelectBasic />
    <DemoSelectDefaultValue />
    <DemoSelectDisabled />
    <DemoSelectSeparator />
    <DemoSelectGroup />
  </SCard>
</template>
