<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef([createDate(2026, 4, 18), createDate(2026, 4, 21)]);
</script>

<template>
  <SCalendar v-model="value" multiple :default-placeholder="value[0]" />
</template>
