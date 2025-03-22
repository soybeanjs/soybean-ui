<script setup lang="ts">
import { SAlert } from 'soy-ui';
import type { AlertVariant, ThemeColor, ThemeSize } from 'soy-ui';
import { Rocket, Terminal, TriangleAlert } from 'lucide-vue-next';

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: AlertVariant[] = ['outline', 'pure', 'soft', 'ghost'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
defineOptions({
  name: 'AlertDemo'
});
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-c-stretch gap-12px">
    <SAlert v-for="color in colors" :key="color" :color="color" :title="color">
      <template #icon>
        <Terminal />
      </template>
    </SAlert>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex flex-c-stretch gap-12px">
    <SAlert
      v-for="(variant, index) in variants"
      :key="variant"
      :color="colors[index]"
      :variant="variant"
      :title="variant"
      closable
    >
      <template #icon>
        <Terminal />
      </template>
    </SAlert>
  </div>
  <div class="py-12px text-18px">With description</div>
  <SAlert variant="pure" title="Heads up!" description="You can add components to your app using the cli." />
  <div class="py-12px text-18px">With Icon</div>
  <SAlert color="success" variant="outline" title="Flighting !!!">
    <template #icon>
      <Rocket />
    </template>
  </SAlert>
  <div class="py-12px text-18px">With description and icon</div>
  <SAlert
    color="destructive"
    variant="ghost"
    title="Error"
    description="Your session has expired. Please log in again."
  >
    <template #icon>
      <TriangleAlert />
    </template>
  </SAlert>
  <div class="py-12px text-18px">Closable</div>
  <SAlert variant="outline" title="Closable" description="You can click close icon to close alert." closable />
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-c-stretch gap-12px">
    <SAlert
      v-for="(size, index) in sizes"
      :key="size"
      :color="colors[index]"
      variant="ghost"
      :size="size"
      :title="`Size: ${size}`"
    >
      <template #icon>
        <Terminal />
      </template>
    </SAlert>
  </div>
</template>
