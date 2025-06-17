<script setup lang="ts">
import { SCard, SDivider } from '@ui';
</script>

<template>
  <SCard title="Orientation" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Horizontal">
      <SDivider label="Label" />
    </SCard>
    <SCard title="Vertical">
      <div class="flex items-center gap-2 h-6">
        <div>Vue</div>
        <SDivider orientation="vertical" />
        <div>SoybeanHeadless</div>
        <SDivider orientation="vertical" />
        <div>SoybeanUI</div>
      </div>
    </SCard>
  </SCard>
</template>
