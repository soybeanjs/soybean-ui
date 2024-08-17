<script setup lang="ts">
import { ExclamationTriangleIcon, RocketIcon } from '@radix-icons/vue';
import { SAlert } from '@soybean-unify/ui';
import type { AlertColor, AlertVariant } from '@soybean-unify/ui';

const colors: AlertColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const variants: AlertVariant[] = ['outline', 'plain', 'soft'];

defineOptions({
  name: 'AlertDemo'
});
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-col-stretch gap-12px">
    <SAlert v-for="color in colors" :key="color" :color="color">{{ color }}</SAlert>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex flex-col-stretch gap-12px">
    <SAlert v-for="(variant, index) in variants" :key="variant" :color="colors[index]" :variant="variant" closable>
      {{ variant }}
    </SAlert>
  </div>
  <div class="py-12px text-18px">With description</div>
  <SAlert variant="plain" title="Heads up!" description="You can add components to your app using the cli." />
  <div class="py-12px text-18px">With Icon</div>
  <SAlert color="success" variant="outline" title="Flighting !!!">
    <template #icon="slotProps">
      <RocketIcon v-bind="slotProps" />
    </template>
  </SAlert>
  <div class="py-12px text-18px">With description and icon</div>
  <SAlert color="destructive" title="Error" description="Your session has expired. Please log in again.">
    <template #icon="slotProps">
      <ExclamationTriangleIcon v-bind="slotProps" />
    </template>
  </SAlert>
  <div class="py-12px text-18px">Closable</div>
  <SAlert variant="outline" title="Closable" description="You can click close icon to close alert." closable />
</template>
