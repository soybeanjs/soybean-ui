<script setup lang="ts">
import { Time } from '@internationalized/date';
import { STimeRangeField } from '@soybeanjs/ui';

const value = {
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
};
</script>

<template>
  <STimeRangeField class="w-90 lt-md:w-auto" :model-value="value" disabled aria-label="Disabled time range" />
</template>
