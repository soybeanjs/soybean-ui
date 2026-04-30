<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';

import { STimeRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(10, 0, 0),
  end: new Time(12, 30, 0)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Custom styling</h3>
    <STimeRangePicker
      v-model="value"
      class="w-90 lt-md:w-auto"
      aria-label="Styled working hours"
      :ui="{
        trigger: 'border-primary/40 bg-primary/4',
        popup: 'border-primary/30',
        cellTrigger: 'data-[range-start]:bg-primary/90 data-[range-end]:bg-primary/90'
      }"
    />
  </div>
</template>
