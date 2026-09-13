<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@soybeanjs/headless/date';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: createTime(9, 0, 0),
  end: createTime(17, 30, 0)
});
</script>

<template>
  <STimeRangeField v-model="value" aria-label="Working hours" />
</template>
