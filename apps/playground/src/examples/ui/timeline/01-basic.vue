<script setup lang="ts">
import { STimeline, STimelineItem } from '@soybeanjs/ui';
</script>

<template>
  <STimeline class="w-100">
    <STimelineItem label="2024-01-01">
      <div class="font-medium">Created account</div>
      <div class="text-muted-foreground">User registered with the workspace.</div>
    </STimelineItem>
    <STimelineItem label="2024-02-15">
      <div class="font-medium">First commit</div>
      <div class="text-muted-foreground">Initial project scaffolding was pushed.</div>
    </STimelineItem>
    <STimelineItem label="2024-03-30">
      <div class="font-medium">Release v1.0</div>
      <div class="text-muted-foreground">Public release shipped to production.</div>
    </STimelineItem>
  </STimeline>
</template>
