<script setup lang="ts">
import { SCard } from '@ui';
import DemoDropdownMenuBase from './base.vue';
import DemoDropdownMenuTrigger from './trigger.vue';
import DemoDropdownMenuArrow from './arrow.vue';
import DemoDropdownMenuCheckbox from './checkbox.vue';
import DemoDropdownMenuRadio from './radio.vue';
</script>

<template>
  <SCard title="Dropdown Menu" :ui="{ content: 'flex-c gap-3' }">
    <DemoDropdownMenuBase />
    <DemoDropdownMenuTrigger />
    <DemoDropdownMenuArrow />
    <DemoDropdownMenuCheckbox />
    <DemoDropdownMenuRadio />
  </SCard>
</template>
