<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
});
</script>

<template>
  <STimeRangeField v-model="value" aria-label="Working hours" />
</template>
