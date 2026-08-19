<script setup lang="ts">
import { SStatistic } from '@soybeanjs/ui';
</script>

<template>
  <div class="flex items-end gap-8">
    <SStatistic label="xs" size="xs" :value="1220" suffix="px" />
    <SStatistic label="sm" size="sm" :value="1220" suffix="px" />
    <SStatistic label="md" size="md" :value="1220" suffix="px" />
    <SStatistic label="lg" size="lg" :value="1220" suffix="px" />
    <SStatistic label="xl" size="xl" :value="1220" suffix="px" />
    <SStatistic label="2xl" size="2xl" :value="1220" suffix="px" />
  </div>
</template>
