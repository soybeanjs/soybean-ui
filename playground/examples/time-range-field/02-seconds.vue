<script setup lang="ts">
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = shallowRef({
  start: new Time(9, 0, 15),
  end: new Time(17, 30, 45)
});
</script>

<template>
  <STimeRangeField v-model="value" granularity="second" aria-label="Precise range" />
</template>
