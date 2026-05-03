<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoKbdBasic from './basic.vue';
import DemoKbdRaised from './raised.vue';
import DemoKbdSize from './size.vue';
import DemoKbdVariant from './variant.vue';
</script>

<template>
  <SCard title="Kbd" split :ui="{ content: 'flex-c gap-4' }">
    <DemoKbdBasic />
    <DemoKbdSize />
    <DemoKbdVariant />
    <DemoKbdRaised />
  </SCard>
</template>
