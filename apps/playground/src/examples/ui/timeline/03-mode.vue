<script setup lang="ts">
import { STimeline, STimelineItem } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-120">
    <STimeline mode="alternate">
      <STimelineItem label="09:00">
        <div class="font-medium">Stand-up meeting</div>
        <div class="text-muted-foreground">Team sync.</div>
      </STimelineItem>
      <STimelineItem label="12:00">
        <div class="font-medium">Lunch</div>
        <div class="text-muted-foreground">Break.</div>
      </STimelineItem>
      <STimelineItem label="15:30">
        <div class="font-medium">Code review</div>
        <div class="text-muted-foreground">Two PRs reviewed.</div>
      </STimelineItem>
      <STimelineItem label="18:00">
        <div class="font-medium">Wrap up</div>
        <div class="text-muted-foreground">Plan for tomorrow.</div>
      </STimelineItem>
    </STimeline>
  </div>
</template>
