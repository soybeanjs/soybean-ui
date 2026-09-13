<script setup lang="ts">
import { createTime } from '@soybeanjs/headless/date';
import { STimeRangeField } from '@soybeanjs/ui';

const value = {
  start: createTime(9, 0, 0),
  end: createTime(17, 30, 0)
};
</script>

<template>
  <STimeRangeField :model-value="value" disabled aria-label="Disabled time range" />
</template>
