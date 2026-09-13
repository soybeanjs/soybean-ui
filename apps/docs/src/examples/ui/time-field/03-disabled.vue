<script setup lang="ts">
import { createTime } from '@vean/aria/date';
import { STimeField } from '@vean/ui';

const value = createTime(8, 0, 0);
</script>

<template>
  <STimeField :model-value="value" disabled aria-label="Disabled time" />
</template>
