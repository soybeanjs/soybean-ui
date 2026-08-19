<script setup lang="ts">
import { STimeline, STimelineItem } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-100">
    <STimeline reverse>
      <STimelineItem label="Step 1">
        <div class="font-medium">Oldest event</div>
      </STimelineItem>
      <STimelineItem label="Step 2">
        <div class="font-medium">Middle event</div>
      </STimelineItem>
      <STimelineItem label="Step 3">
        <div class="font-medium">Newest event</div>
      </STimelineItem>
    </STimeline>
  </div>
</template>
