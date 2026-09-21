<script setup lang="ts">
import { shallowRef } from 'vue';
import { SDateRangePicker } from '@vean/ui';

const range = shallowRef();
</script>

<template>
  <SDateRangePicker v-model="range" />
</template>
