<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoEditableActivationMode from './activation-mode.vue';
import DemoEditableBasic from './basic.vue';
import DemoEditableCustomStyling from './custom-styling.vue';
import DemoEditableDisabled from './disabled.vue';
import DemoEditableSize from './size.vue';
</script>

<template>
  <SCard title="Editable" split :ui="{ content: 'flex-c gap-4' }">
    <DemoEditableBasic />
    <DemoEditableSize />
    <DemoEditableDisabled />
    <DemoEditableActivationMode />
    <DemoEditableCustomStyling />
  </SCard>
</template>
