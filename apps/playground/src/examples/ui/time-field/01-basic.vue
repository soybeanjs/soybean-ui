<script setup lang="ts">
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = shallowRef(new Time(9, 30, 0));
</script>

<template>
  <STimeField v-model="value" aria-label="Meeting time" />
</template>
