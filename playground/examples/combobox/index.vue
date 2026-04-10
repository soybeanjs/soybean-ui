<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoComboboxBasic from './basic.vue';
import DemoComboboxDisabled from './disabled.vue';
import DemoComboboxGroup from './group.vue';
import DemoComboboxMultiple from './multiple.vue';
import DemoComboboxCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Combobox" split :ui="{ content: 'flex-c gap-4' }">
    <DemoComboboxBasic />
    <DemoComboboxDisabled />
    <DemoComboboxGroup />
    <DemoComboboxMultiple />
    <DemoComboboxCustomStyling />
  </SCard>
</template>
