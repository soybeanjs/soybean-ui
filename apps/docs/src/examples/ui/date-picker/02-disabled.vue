<script setup lang="ts">
import { ref } from 'vue';
import { createDate } from '@vean/aria/date';
import { SDatePicker } from '@vean/ui';

const selectedDate = ref<any>();
</script>

<template>
  <SDatePicker v-model="selectedDate" :default-placeholder="createDate(2024, 1, 1)" disabled />
</template>
