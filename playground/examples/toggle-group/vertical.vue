<script setup lang="ts">
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Vertical</h3>
    <div class="flex flex-wrap gap-3">
      <SToggleGroup orientation="vertical" variant="outline" default-value="week">
        <SToggleGroupItem value="day">Day</SToggleGroupItem>
        <SToggleGroupItem value="week">Week</SToggleGroupItem>
        <SToggleGroupItem value="month">Month</SToggleGroupItem>
      </SToggleGroup>
    </div>
  </div>
</template>
