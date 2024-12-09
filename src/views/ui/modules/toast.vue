<script setup lang="tsx">
import { SButton, SToastAction, useToast } from '@soybean-ui/vue';

defineOptions({
  name: 'UiToast'
});

const { toast } = useToast();

function openToast() {
  toast({
    title: 'Hello',
    description: 'This is a toast',
    duration: 100 * 1000
  });
}

function openToast2() {
  toast({
    title: 'Hello',
    description: 'This is a toast',
    color: 'destructive'
  });
}

function openToast3() {
  toast({
    title: 'Hello',
    description: 'This is a toast',
    color: 'success'
  });
}

function openToastWithAction() {
  toast({
    title: 'Hello',
    description: 'This is a toast',
    action: <SToastAction altText="Click me">Click me</SToastAction>
  });
}
</script>

<template>
  <SButton @click="openToast">open</SButton>
  <SButton @click="openToast2">open2</SButton>
  <SButton @click="openToast3">open3</SButton>
  <SButton @click="openToastWithAction">openWithAction</SButton>
</template>

<style scoped></style>
