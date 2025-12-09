<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import CheckboxSingle from './single.vue';
import CheckboxColor from './color.vue';
import CheckboxSize from './size.vue';
import CheckboxShape from './shape.vue';
import CheckboxIcon from './icon.vue';
import CheckboxGroup from './group.vue';
import CheckboxCard from './card.vue';
import CheckboxCardGroup from './card-group.vue';
</script>

<template>
  <SCard title="Checkbox" split :ui="{ content: 'flex-c gap-4' }">
    <CheckboxSingle />
    <CheckboxColor />
    <CheckboxSize />
    <CheckboxShape />
    <CheckboxIcon />
    <CheckboxGroup />
    <CheckboxCard />
    <CheckboxCardGroup />
  </SCard>
</template>
