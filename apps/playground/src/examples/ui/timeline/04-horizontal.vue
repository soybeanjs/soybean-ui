<script setup lang="ts">
import { STimeline, STimelineItem } from '@soybeanjs/ui';
</script>

<template>
  <STimeline orientation="horizontal" class="w-150">
    <STimelineItem label="Q1">
      <div class="font-medium">Design</div>
      <div class="text-muted-foreground">Wireframes approved.</div>
    </STimelineItem>
    <STimelineItem label="Q2" color="success">
      <div class="font-medium">Build</div>
      <div class="text-muted-foreground">Core features landed.</div>
    </STimelineItem>
    <STimelineItem label="Q3" color="warning">
      <div class="font-medium">Beta</div>
      <div class="text-muted-foreground">Feedback collected.</div>
    </STimelineItem>
    <STimelineItem label="Q4" color="destructive">
      <div class="font-medium">Launch</div>
      <div class="text-muted-foreground">General availability.</div>
    </STimelineItem>
  </STimeline>
</template>
