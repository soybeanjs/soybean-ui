<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoClipboardBasic from './basic.vue';
import DemoClipboardColor from './color.vue';
import DemoClipboardVariant from './variant.vue';
import DemoClipboardSize from './size.vue';
import DemoClipboardDisabled from './disabled.vue';
import DemoClipboardCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Clipboard" split :ui="{ content: 'flex-c gap-4' }">
    <DemoClipboardBasic />
    <DemoClipboardColor />
    <DemoClipboardVariant />
    <DemoClipboardSize />
    <DemoClipboardDisabled />
    <DemoClipboardCustomStyling />
  </SCard>
</template>
