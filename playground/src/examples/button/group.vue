<script setup lang="ts">
import { SButton, SButtonGroup, SCard } from '@ui';
</script>

<template>
  <SCard title="Button Group" split>
    <SButtonGroup variant="pure" color="accent">
      <SButton v-for="i in 5" :key="i">Button {{ i }}</SButton>
    </SButtonGroup>
  </SCard>
  <SCard title="Button Group Vertical" split>
    <SButtonGroup orientation="vertical" class="w-30" variant="outline" color="warning">
      <SButton v-for="i in 10" :key="i">Button {{ i }}</SButton>
    </SButtonGroup>
  </SCard>
</template>
