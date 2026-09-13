<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@vean/aria/date';
import { STimeField } from '@vean/ui';

const value = shallowRef(createTime(14, 45, 30));
</script>

<template>
  <STimeField v-model="value" granularity="second" aria-label="Precise time" />
</template>
