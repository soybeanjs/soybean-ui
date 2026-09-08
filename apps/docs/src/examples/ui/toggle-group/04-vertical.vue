<script setup lang="ts">
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';
</script>

<template>
  <SToggleGroup orientation="vertical" variant="outline" default-value="week">
    <SToggleGroupItem value="day">Day</SToggleGroupItem>
    <SToggleGroupItem value="week">Week</SToggleGroupItem>
    <SToggleGroupItem value="month">Month</SToggleGroupItem>
  </SToggleGroup>
</template>
