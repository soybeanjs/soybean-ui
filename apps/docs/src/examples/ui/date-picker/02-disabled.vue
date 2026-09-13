<script setup lang="ts">
import { ref } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SDatePicker } from '@soybeanjs/ui';

const selectedDate = ref<any>();
</script>

<template>
  <SDatePicker v-model="selectedDate" :default-placeholder="createDate(2024, 1, 1)" disabled />
</template>
