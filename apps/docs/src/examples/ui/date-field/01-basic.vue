<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(createDate(2026, 4, 19));
</script>

<template>
  <SDateField v-model="value" aria-label="Event date" class="w-fit" />
  <p class="text-sm text-muted-foreground">Value: {{ value?.toString() ?? '-' }}</p>
</template>
