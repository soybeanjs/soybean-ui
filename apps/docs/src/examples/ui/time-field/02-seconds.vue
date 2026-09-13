<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@soybeanjs/headless/date';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(createTime(14, 45, 30));
</script>

<template>
  <STimeField v-model="value" granularity="second" aria-label="Precise time" />
</template>
