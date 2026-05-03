<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoDropdownMenuBasic from './basic.vue';
import DemoDropdownMenuTrigger from './trigger.vue';
import DemoDropdownMenuArrow from './arrow.vue';
import DemoDropdownMenuCheckbox from './checkbox.vue';
import DemoDropdownMenuRadio from './radio.vue';
import DemoDropdownMenuMix from './mix.vue';
</script>

<template>
  <SCard title="Dropdown Menu" split :ui="{ content: 'flex-c gap-4' }">
    <DemoDropdownMenuBasic />
    <DemoDropdownMenuTrigger />
    <DemoDropdownMenuArrow />
    <DemoDropdownMenuCheckbox />
    <DemoDropdownMenuRadio />
    <DemoDropdownMenuMix />
  </SCard>
</template>
