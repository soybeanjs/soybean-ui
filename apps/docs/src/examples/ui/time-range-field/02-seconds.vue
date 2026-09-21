<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@vean/aria/date';
import { STimeRangeField } from '@vean/ui';

const value = shallowRef({
  start: createTime(9, 0, 15),
  end: createTime(17, 30, 45)
});
</script>

<template>
  <STimeRangeField v-model="value" granularity="second" aria-label="Precise range" />
</template>
