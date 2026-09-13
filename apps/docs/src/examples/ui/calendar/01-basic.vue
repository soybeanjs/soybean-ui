<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef(createDate(2026, 4, 18));
</script>

<template>
  <SCalendar v-model="value" :default-placeholder="value" />
</template>
