<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(new Time(14, 45, 30));
</script>

<template>
  <STimeField v-model="value" granularity="second" aria-label="Precise time" />
</template>
