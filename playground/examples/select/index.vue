<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSelectBasic from './basic.vue';
import DemoSelectDefaultValue from './default-value.vue';
import DemoSelectDisabled from './disabled.vue';
import DemoSelectSeparator from './separator.vue';
import DemoSelectGroup from './group.vue';
import DemoSelectMultiple from './multiple.vue';
import DemoSelectSingleClearable from './single-clearable.vue';
</script>

<template>
  <SCard title="Select" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSelectBasic />
    <DemoSelectDefaultValue />
    <DemoSelectDisabled />
    <DemoSelectSeparator />
    <DemoSelectGroup />
    <DemoSelectMultiple />
    <DemoSelectSingleClearable />
  </SCard>
</template>
