<script setup lang="ts">
import { createTime } from '@soybeanjs/headless/date';
import { STimeField } from '@soybeanjs/ui';

const value = createTime(8, 0, 0);
</script>

<template>
  <STimeField :model-value="value" disabled aria-label="Disabled time" />
</template>
