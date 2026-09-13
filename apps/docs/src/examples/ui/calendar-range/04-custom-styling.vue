<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SCalendarRange } from '@soybeanjs/ui';

const value = shallowRef({
  start: createDate(2026, 4, 18),
  end: createDate(2026, 4, 22)
});
</script>

<template>
  <SCalendarRange
    v-model="value"
    :default-placeholder="value.start"
    :ui="{
      root: 'rounded-xl border border-primary/30 p-4',
      cellTrigger: 'data-[selection-start]:bg-primary data-[selection-end]:bg-primary data-[highlighted]:bg-primary/15'
    }"
  />
</template>
