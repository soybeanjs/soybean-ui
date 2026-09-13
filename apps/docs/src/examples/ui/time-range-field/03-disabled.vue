<script setup lang="ts">
import { createTime } from '@vean/aria/date';
import { STimeRangeField } from '@vean/ui';

const value = {
  start: createTime(9, 0, 0),
  end: createTime(17, 30, 0)
};
</script>

<template>
  <STimeRangeField :model-value="value" disabled aria-label="Disabled time range" />
</template>
