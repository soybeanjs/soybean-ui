<script setup lang="ts">
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = shallowRef({
  start: new Time(10, 0, 0),
  end: new Time(18, 0, 0)
});
</script>

<template>
  <STimeRangeField
    v-model="value"
    aria-label="Styled time range"
    :ui="{
      root: 'rounded-xl border-primary/40 bg-primary/4',
      input: 'focus-visible:bg-primary/12',
      separator: 'font-medium text-primary'
    }"
  />
</template>
