<script setup lang="ts">
import { SCard, SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Orientation" :ui="{ content: 'flex-c gap-3' }">
    <SCard title="Horizontal">
      <SSeparator label="Label" />
    </SCard>
    <SCard title="Vertical">
      <div class="flex items-center gap-2 h-6">
        <div>Vue</div>
        <SSeparator orientation="vertical" />
        <div>SoybeanHeadless</div>
        <SSeparator orientation="vertical" />
        <div>SoybeanUI</div>
      </div>
    </SCard>
  </SCard>
</template>
