<script setup lang="ts">
import { SAlert, SCard } from 'soy-ui';
import type { AlertVariant, ThemeColor, ThemeSize } from 'soy-ui';
import { Rocket, Terminal, TriangleAlert } from 'lucide-vue-next';

defineOptions({
  name: 'DemoAlert'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: AlertVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex flex-c-stretch gap-12px">
        <SAlert v-for="color in colors" :key="color" :color="color" :title="color">
          <template #icon>
            <Terminal />
          </template>
        </SAlert>
      </div>
    </SCard>
    <SCard title="Variant" split>
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
    </SCard>
    <SCard title="With description" split>
      <SAlert variant="pure" title="Heads up!" description="You can add components to your app using the cli." />
    </SCard>
    <SCard title="With Icon" split>
      <SAlert color="success" variant="outline" title="Flighting !!!">
        <template #icon>
          <Rocket />
        </template>
      </SAlert>
    </SCard>
    <SCard title="With description and icon" split>
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
    </SCard>
    <SCard title="Closable" split>
      <SAlert variant="outline" title="Closable" description="You can click close icon to close alert." closable />
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-c-stretch gap-12px">
        <SAlert
          v-for="(size, index) in sizes"
          :key="size"
          :title="`Size: ${size}`"
          :color="colors[index]"
          variant="soft"
          :size="size"
          closable
        >
          <template #icon>
            <Terminal />
          </template>
        </SAlert>
      </div>
    </SCard>
  </div>
</template>
