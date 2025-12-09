<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAlertColor from './color.vue';
import DemoAlertVariant from './variant.vue';
import DemoAlertDescription from './description.vue';
import DemoAlertIcon from './icon.vue';
import DemoAlertDescIcon from './desc-icon.vue';
import DemoAlertClosable from './closable.vue';
import DemoAlertSlot from './slot.vue';
import DemoAlertSize from './size.vue';
</script>

<template>
  <SCard title="Alert" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAlertColor />
    <DemoAlertVariant />
    <DemoAlertDescription />
    <DemoAlertIcon />
    <DemoAlertDescIcon />
    <DemoAlertClosable />
    <DemoAlertSlot />
    <DemoAlertSize />
  </SCard>
</template>
