<script setup lang="tsx">
import { SButton, SToastAction, useToast } from '@soybean-ui/vue';

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

function openToastWithSuccessIcon() {
  toast({
    title: 'Success Icon',
    description: 'This is a toast with success icon',
    iconType: 'success'
  });
}

function openDestructiveToast() {
  toast({
    title: 'Destructive',
    description: 'This is a toast with destructive color',
    richColor: 'destructive'
  });
}

function openToastWithWarningColorAndIcon() {
  toast({
    title: 'Warning Icon',
    description: 'This is a toast with warning icon',
    iconType: 'warning',
    richColor: 'warning'
  });
}

function openToastWithAction() {
  toast({
    title: 'Action',
    description: 'This is a toast with action',
    action: <SToastAction altText="Click me">Click me</SToastAction>
  });
}
</script>

<template>
  <div class="flex gap-2">
    <SButton variant="outline" @click="openToast">Default</SButton>
    <SButton variant="outline" @click="openDestructiveToast">Destructive</SButton>
    <SButton variant="outline" @click="openToastWithSuccessIcon">Success Icon</SButton>
    <SButton variant="outline" @click="openToastWithAction">With Action</SButton>
    <SButton variant="outline" @click="openToastWithWarningColorAndIcon">Warning Color And Icon</SButton>
  </div>
</template>
