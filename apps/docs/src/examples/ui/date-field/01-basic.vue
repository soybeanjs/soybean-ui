<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@vean/aria/date';
import { SDateField } from '@vean/ui';

const value = shallowRef(createDate(2026, 4, 19));
</script>

<template>
  <SDateField v-model="value" aria-label="Event date" class="w-fit" />
  <p class="text-sm text-muted-foreground">Value: {{ value?.toString() ?? '-' }}</p>
</template>
