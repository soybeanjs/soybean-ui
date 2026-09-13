<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@soybeanjs/headless/date';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: createTime(9, 0, 15),
  end: createTime(17, 30, 45)
});
</script>

<template>
  <STimeRangeField v-model="value" granularity="second" aria-label="Precise range" />
</template>
