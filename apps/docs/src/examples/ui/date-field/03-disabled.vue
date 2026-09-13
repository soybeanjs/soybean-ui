<script setup lang="ts">
import { createDate } from '@vean/aria/date';
import { SDateField } from '@vean/ui';

const value = createDate(2026, 4, 19);
</script>

<template>
  <SDateField :model-value="value" disabled aria-label="Disabled date" class="w-fit" />
</template>
