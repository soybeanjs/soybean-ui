<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SDateRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: createDate(2026, 4, 19),
  end: createDate(2026, 4, 26)
});
</script>

<template>
  <SDateRangeField v-model="value" aria-label="Date range" />
  <div class="text-xs text-muted-foreground">
    Selected: {{ value.start?.toString() }} to {{ value.end?.toString() }}
  </div>
</template>
