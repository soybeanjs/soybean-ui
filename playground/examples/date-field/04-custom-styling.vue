<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <SDateField
    v-model="value"
    aria-label="Custom styled date"
    :ui="{
      root: 'rounded-xl border-primary/50 bg-primary/5',
      input: 'font-semibold data-[segment=literal]:font-normal data-[placeholder]:text-primary/50'
    }"
  />
</template>
