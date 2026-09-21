<script setup lang="ts">
import { createDate } from '@vean/aria/date';
import { SCalendar } from '@vean/ui';
</script>

<template>
  <SCalendar
    :default-placeholder="createDate(2026, 4, 18)"
    :ui="{
      root: 'rounded-lg border border-border p-4 shadow-sm',
      cellTrigger: 'data-[today]:border data-[today]:border-primary data-[selected]:rounded-full'
    }"
  />
</template>
