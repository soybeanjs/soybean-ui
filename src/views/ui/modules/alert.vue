<script setup lang="ts">
import { ExclamationTriangleIcon, RocketIcon } from '@radix-icons/vue';
import { SAlert } from '@soybean-unify/ui';
import type { AlertColor, AlertVariant } from '@soybean-unify/ui';

const colors: AlertColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary'];
const variants: AlertVariant[] = ['clean', 'pure', 'ghost'];

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
    <SAlert v-for="(variant, index) in variants" :key="variant" :color="colors[index]" :variant="variant">
      {{ variant }}
    </SAlert>
  </div>
  <div class="py-12px text-18px">With description</div>
  <SAlert variant="pure" title="Heads up!" description="You can add components to your app using the cli." />
  <div class="py-12px text-18px">With Icon</div>
  <SAlert color="success" variant="clean" title="Flighting !!!">
    <template #icon>
      <RocketIcon :size="16" />
    </template>
  </SAlert>
  <div class="py-12px text-18px">With description and icon</div>
  <SAlert color="destructive" title="Error" description="Your session has expired. Please log in again.">
    <template #icon>
      <ExclamationTriangleIcon :size="16" />
    </template>
  </SAlert>
</template>
