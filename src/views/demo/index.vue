<script setup lang="ts">
import { SButton, SCard } from '@soybean-ui/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="h-full p-4">
    <SCard title="Page Demo" split="header" class="h-full">
      <template #extra>
        <SButton @click="router.back">Go Back</SButton>
      </template>
    </SCard>
  </div>
</template>

<style scoped></style>
