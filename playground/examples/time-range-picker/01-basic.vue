<script setup lang="ts">
import { shallowRef } from 'vue';
import { Time } from '@internationalized/date';
import { STimeRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
});
</script>

<template>
  <STimeRangePicker v-model="value" class="w-90 lt-md:w-auto" aria-label="Working hours" />
</template>
