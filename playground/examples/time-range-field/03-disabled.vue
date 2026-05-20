<script setup lang="ts">
import { STimeRangeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = {
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
};
</script>

<template>
  <STimeRangeField :model-value="value" disabled aria-label="Disabled time range" />
</template>
