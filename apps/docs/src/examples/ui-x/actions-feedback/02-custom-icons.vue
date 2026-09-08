<script setup lang="ts">
import { ref } from 'vue';
import { SxActionsFeedback } from '@soybeanjs/ui-x';

const value = ref<'like' | 'dislike' | null>(null);
</script>

<template>
  <SxActionsFeedback :value="value" @change="value = $event">
    <template #like-icon="{ active }">{{ active ? '😍' : '😊' }}</template>
    <template #dislike-icon="{ active }">{{ active ? '😠' : '😕' }}</template>
  </SxActionsFeedback>
</template>
