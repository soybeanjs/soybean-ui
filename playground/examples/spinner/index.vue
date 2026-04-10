<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSpinnerBasic from './basic.vue';
import DemoSpinnerColor from './color.vue';
import DemoSpinnerSize from './size.vue';
import DemoSpinnerIcon from './icon.vue';
import DemoSpinnerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Spinner" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSpinnerBasic />
    <DemoSpinnerColor />
    <DemoSpinnerSize />
    <DemoSpinnerIcon />
    <DemoSpinnerCustomStyling />
  </SCard>
</template>
