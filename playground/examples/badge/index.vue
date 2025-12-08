<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoBadgeColor from './color.vue';
import DemoBadgeContent from './content.vue';
import DemoBadgePosition from './position.vue';
import DemoBadgeSlot from './slot.vue';
import DemoBadgeOpen from './open.vue';
</script>

<template>
  <SCard title="Badge" :ui="{ content: 'flex-c gap-3' }">
    <DemoBadgeColor />
    <DemoBadgeContent />
    <DemoBadgePosition />
    <DemoBadgeSlot />
    <DemoBadgeOpen />
  </SCard>
</template>
