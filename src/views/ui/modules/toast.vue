<script setup lang="ts">
import { SButton, useToast } from '@soybean-ui/vue';

defineOptions({
  name: 'UiToast'
});

const { toast } = useToast();

function openToast() {
  toast({
    title: 'Hello',
    description: 'This is a toast'
  });
}
</script>

<template>
  <SButton @click="openToast">open</SButton>
</template>

<style scoped></style>
