<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@vean/aria/date';
import { SCalendarRange } from '@vean/ui';

const value = shallowRef({
  start: createDate(2026, 4, 18),
  end: createDate(2026, 4, 22)
});
</script>

<template>
  <SCalendarRange v-model="value" :default-placeholder="value.start" />
  <p class="text-sm text-muted-foreground">
    Range: {{ value.start?.toString() ?? '-' }} ~ {{ value.end?.toString() ?? '-' }}
  </p>
</template>
