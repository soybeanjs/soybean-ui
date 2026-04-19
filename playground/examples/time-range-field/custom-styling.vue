<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(10, 0, 0),
  end: new Time(18, 0, 0)
});
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Custom styling</h3>
    <STimeRangeField
      v-model="value"
      class="w-90 lt-md:w-auto"
      aria-label="Styled time range"
      :ui="{
        root: 'rounded-xl border-primary/40 bg-primary/4',
        input: 'focus-visible:bg-primary/12',
        separator: 'font-medium text-primary'
      }"
    />
  </div>
</template>
