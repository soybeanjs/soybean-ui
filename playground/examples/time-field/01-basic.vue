<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(new Time(9, 30, 0));
</script>

<template>
  <STimeField v-model="value" aria-label="Meeting time" />
</template>
