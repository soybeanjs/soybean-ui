<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@vean/aria/date';
import { SDateRangeField } from '@vean/ui';

const value = shallowRef({
  start: createDate(2026, 4, 19),
  end: createDate(2026, 4, 26)
});
</script>

<template>
  <SDateRangeField
    v-model="value"
    size="lg"
    separator="→"
    aria-label="Styled date range"
    :ui="{
      root: 'border-2 border-primary/30',
      input: 'text-primary',
      separator: 'text-primary'
    }"
  />
</template>
