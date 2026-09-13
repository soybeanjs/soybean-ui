<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@soybeanjs/headless/date';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: createTime(10, 0, 0),
  end: createTime(18, 0, 0)
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
