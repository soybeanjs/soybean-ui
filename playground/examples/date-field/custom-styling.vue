<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Custom styling</h3>
    <div class="w-72 lt-md:w-auto">
      <SDateField
        v-model="value"
        class="w-60 lt-md:w-auto"
        aria-label="Custom styled date"
        :ui="{
          root: 'rounded-xl border-primary/50 bg-primary/5',
          input: 'font-semibold data-[segment=literal]:font-normal data-[placeholder]:text-primary/50'
        }"
      />
    </div>
  </div>
</template>
