<script setup lang="ts">
import { useRouter } from 'vue-router';
import { SButton, SCard } from 'soy-ui';

const router = useRouter();
</script>

<template>
  <div class="h-full p-4">
    <SCard title="Page Demo" split class="h-full">
      <template #extra>
        <SButton @click="router.back">Go Back</SButton>
      </template>
    </SCard>
  </div>
</template>
