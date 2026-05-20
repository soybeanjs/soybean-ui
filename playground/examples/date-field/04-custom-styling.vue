<script setup lang="ts">
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <SDateField
    v-model="value"
    aria-label="Custom styled date"
    class="w-fit"
    :ui="{
      root: 'rounded-xl border-primary/50 bg-primary/5',
      input: 'font-semibold data-[segment=literal]:font-normal data-[placeholder]:text-primary/50'
    }"
  />
</template>
