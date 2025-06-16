<script setup lang="ts">
import { SCard } from '@ui';
import CheckboxSingle from './single.vue';
import CheckboxGroup from './group.vue';
import CheckboxCard from './card.vue';
import CheckboxCardGroup from './card-group.vue';
</script>

<template>
  <SCard title="Checkbox" :ui="{ content: 'flex-c gap-3' }">
    <CheckboxSingle />
    <CheckboxGroup />
    <CheckboxCard />
    <CheckboxCardGroup />
  </SCard>
</template>
