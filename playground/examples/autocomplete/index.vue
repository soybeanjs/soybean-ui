<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAutocompleteBasic from './basic.vue';
import DemoAutocompleteGrouped from './grouped.vue';
import DemoAutocompleteOpenOnFocus from './open-on-focus.vue';
import DemoAutocompleteDisabled from './disabled.vue';
import DemoAutocompleteCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Autocomplete" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAutocompleteBasic />
    <DemoAutocompleteGrouped />
    <DemoAutocompleteOpenOnFocus />
    <DemoAutocompleteDisabled />
    <DemoAutocompleteCustomStyling />
  </SCard>
</template>
