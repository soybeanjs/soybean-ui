<script setup lang="ts">
import { SButtonIcon, SCard } from '@ui';
</script>

<template>
  <SCard title="Icon" split>
    <div class="flex flex-wrap gap-3">
      <SButtonIcon icon="lucide:skip-back" />
      <SButtonIcon icon="lucide:skip-forward" />
      <SButtonIcon icon="lucide:pause" />
    </div>
  </SCard>
</template>
