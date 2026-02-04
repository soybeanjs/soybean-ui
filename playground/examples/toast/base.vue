<script setup lang="ts">
import { SButton, useToast } from '@soybeanjs/ui';

const toast = useToast();

const openToast = () => {
  toast({
    title: 'Toast Title',
    description: 'Toast Description',
    duration: 3000,
    onClose: () => {
      console.log('Toast closed');
    }
  });
};
</script>

<template>
  <div>
    <h3 class="playground-title">Base</h3>
    <SButton variant="pure" @click="openToast">Default</SButton>
  </div>
</template>
