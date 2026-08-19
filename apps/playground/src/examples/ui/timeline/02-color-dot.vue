<script setup lang="ts">
import { STimeline, STimelineItem } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex w-120 gap-12">
    <STimeline class="flex-1">
      <STimelineItem color="success">
        <div class="font-medium">Deployment succeeded</div>
        <div class="text-muted-foreground">All checks passed.</div>
      </STimelineItem>
      <STimelineItem color="warning">
        <div class="font-medium">Deprecation warning</div>
        <div class="text-muted-foreground">Legacy endpoint still in use.</div>
      </STimelineItem>
      <STimelineItem color="destructive">
        <div class="font-medium">Build failed</div>
        <div class="text-muted-foreground">Type error in the entry module.</div>
      </STimelineItem>
    </STimeline>
    <STimeline class="flex-1">
      <STimelineItem>
        <template #dot>
          <span class="i-lucide:git-commit size-4 text-primary" />
        </template>
        <div class="font-medium">Custom icon dot</div>
        <div class="text-muted-foreground">Any content can replace the marker.</div>
      </STimelineItem>
      <STimelineItem color="info">
        <template #dot>
          <span class="i-lucide:star size-4 text-info" />
        </template>
        <div class="font-medium">Starred milestone</div>
        <div class="text-muted-foreground">Icon and color combined.</div>
      </STimelineItem>
    </STimeline>
  </div>
</template>
