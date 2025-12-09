<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoContextMenuBase from './base.vue';
import DemoContextMenuCheckbox from './checkbox.vue';
import DemoContextMenuRadio from './radio.vue';
import DemoContextMenuMix from './mix.vue';
</script>

<template>
  <SCard title="Context Menu" split :ui="{ content: 'flex-c gap-4' }">
    <DemoContextMenuBase />
    <DemoContextMenuCheckbox />
    <DemoContextMenuRadio />
    <DemoContextMenuMix />
  </SCard>
</template>
