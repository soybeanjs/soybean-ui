<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 15),
  end: new Time(17, 30, 45)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">With seconds</h3>
    <STimeRangeField v-model="value" class="w-100 lt-md:w-auto" granularity="second" aria-label="Precise range" />
  </div>
</template>
