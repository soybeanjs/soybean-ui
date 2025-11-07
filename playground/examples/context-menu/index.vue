<script setup lang="ts">
import { SCard } from '@ui';
import DemoContextMenuBase from './base.vue';
import DemoContextMenuCheckbox from './checkbox.vue';
import DemoContextMenuRadio from './radio.vue';
import DemoContextMenuMix from './mix.vue';
</script>

<template>
  <SCard title="Context Menu" :ui="{ content: 'flex-c gap-3' }">
    <DemoContextMenuBase />
    <DemoContextMenuCheckbox />
    <DemoContextMenuRadio />
    <DemoContextMenuMix />
  </SCard>
</template>
