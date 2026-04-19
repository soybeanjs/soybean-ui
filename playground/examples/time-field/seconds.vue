<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(new Time(14, 45, 30));
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">With seconds</h3>
    <STimeField v-model="value" class="w-90 lt-md:w-auto" granularity="second" aria-label="Precise time" />
  </div>
</template>
