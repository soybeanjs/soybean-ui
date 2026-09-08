<script setup lang="ts">
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = shallowRef(new Time(14, 45, 30));
</script>

<template>
  <STimeField v-model="value" granularity="second" aria-label="Precise time" />
</template>
