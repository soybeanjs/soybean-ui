<script setup lang="ts">
import { SButton } from '@soybean-unify/ui';
import type { ButtonColor, ButtonSize, ButtonVariant } from '@soybean-unify/ui';
import { Loader, LoaderCircle, Minus, Plus } from 'lucide-vue-next';

defineOptions({
  name: 'UiButton'
});

const colors: ButtonColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary'];
const variants: ButtonVariant[] = ['solid', 'pure', 'outline', 'dashed', 'ghost', 'text', 'link'];
const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-col-stretch gap-12px">
    <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
      <SButton v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</SButton>
    </div>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-wrap gap-12px">
    <SButton v-for="(size, index) in sizes" :key="size" :color="colors[index]" :variant="variants[index]" :size="size">
      {{ size }}
    </SButton>
  </div>
  <div class="py-12px text-18px">Shape</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="primary" variant="outline" shape="rounded">rounded</SButton>
    <div class="flex-col-center">
      <SButton color="destructive" variant="dashed" shape="square">
        <Minus :size="16" />
      </SButton>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-col-center">
      <SButton color="success" variant="ghost" shape="circle">
        <Plus :size="16" />
      </SButton>
      <div class="text-12px text-#666">circle</div>
    </div>
    <div class="flex-col-center">
      <SButton color="secondary" variant="text" shape="square">
        <Plus :size="16" />
      </SButton>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-col-center">
      <SButton color="secondary" variant="text" shape="circle">
        <Minus :size="16" />
      </SButton>
      <div class="text-12px text-#666">circle</div>
    </div>
  </div>
  <div class="py-12px text-18px">Slot</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="primary">
      <template #before>
        <Plus :size="16" />
      </template>
      Before
    </SButton>
    <SButton color="destructive" variant="outline">
      After
      <template #after>
        <Minus :size="16" />
      </template>
    </SButton>
    <SButton color="success" variant="dashed">
      <template #before>
        <Plus :size="16" />
      </template>
      Both
      <template #after>
        <Minus :size="16" />
      </template>
    </SButton>
  </div>
  <div class="py-12px text-18px">Disabled</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="destructive" variant="solid" disabled>disabled</SButton>
    <SButton color="success" variant="outline" disabled>disabled</SButton>
    <SButton color="warning" variant="dashed" disabled>disabled</SButton>
  </div>
  <div class="py-12px text-18px">Loading</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="success" variant="solid" disabled>
      <template #before>
        <LoaderCircle :size="16" class="animate-spin" />
      </template>
      Loading...
    </SButton>
    <SButton color="warning" variant="outline" disabled>
      <template #before>
        <Loader :size="16" class="animate-spin" />
      </template>
      Loading...
    </SButton>
  </div>
</template>
