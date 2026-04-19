<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';

import { STimeRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Basic</h3>
    <STimeRangePicker v-model="value" class="w-90 lt-md:w-auto" aria-label="Working hours" />
  </div>
</template>
