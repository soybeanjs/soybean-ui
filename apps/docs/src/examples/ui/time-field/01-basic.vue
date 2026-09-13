<script setup lang="ts">
import { shallowRef } from 'vue';
import { createTime } from '@vean/aria/date';
import { STimeField } from '@vean/ui';

const value = shallowRef(createTime(9, 30, 0));
</script>

<template>
  <STimeField v-model="value" aria-label="Meeting time" />
</template>
