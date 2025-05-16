<script setup lang="ts">
import { h } from 'vue';
import { SButton, SCard, SToastAction, useToast } from 'soy-ui';

defineOptions({
  name: 'DemoToast'
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
    action: h(SToastAction, { altText: 'Click me' }, () => 'Click me')
  });
}
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <SButton variant="outline" @click="openToast">Open</SButton>
    </SCard>
    <SCard title="Destructive" split>
      <SButton variant="outline" @click="openDestructiveToast">Open</SButton>
    </SCard>
    <SCard title="Success Icon" split>
      <SButton variant="outline" @click="openToastWithSuccessIcon">Open</SButton>
    </SCard>
    <SCard title="With Action" split>
      <SButton variant="outline" @click="openToastWithAction">Open</SButton>
    </SCard>
    <SCard title="Warning Color And Icon" split>
      <SButton variant="outline" @click="openToastWithWarningColorAndIcon">Open</SButton>
    </SCard>
  </div>
</template>
