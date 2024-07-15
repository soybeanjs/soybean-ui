<script setup lang="ts">
import { SuButton } from '@soybean-unify/ui';
import type { ButtonColor, ButtonSize, ButtonVariant } from '@soybean-unify/ui';
import { Airplay, Loader, LoaderCircle } from 'lucide-vue-next';

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
    <SuButton v-for="color in colors" :key="color" :color="color">{{ color }}</SuButton>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-col-stretch gap-12px">
    <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
      <SuButton v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</SuButton>
    </div>
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton v-for="(size, index) in sizes" :key="size" :color="colors[index]" :variant="variants[index]" :size="size">
      {{ size }}
    </SuButton>
  </div>
  <div class="py-12px text-18px">Shape</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="primary" variant="outline" shape="rounded">rounded</SuButton>
    <div class="flex-col-center">
      <SuButton color="destructive" variant="dashed" shape="square">
        <Airplay :size="16" />
      </SuButton>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-col-center">
      <SuButton color="success" variant="ghost" shape="circle">
        <Airplay :size="16" />
      </SuButton>
      <div class="text-12px text-#666">circle</div>
    </div>
  </div>
  <div class="py-12px text-18px">Slot</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="primary">
      <template #before>
        <Airplay :size="16" />
      </template>
      Before
    </SuButton>
    <SuButton color="destructive" variant="outline">
      After
      <template #after>
        <Airplay :size="16" />
      </template>
    </SuButton>
    <SuButton color="success" variant="dashed">
      <template #before>
        <Airplay :size="16" />
      </template>
      Both
      <template #after>
        <Airplay :size="16" />
      </template>
    </SuButton>
  </div>
  <div class="py-12px text-18px">Disabled</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="destructive" variant="solid" disabled>disabled</SuButton>
    <SuButton color="success" variant="outline" disabled>disabled</SuButton>
    <SuButton color="warning" variant="dashed" disabled>disabled</SuButton>
  </div>
  <div class="py-12px text-18px">Loading</div>
  <div class="flex flex-wrap gap-12px">
    <SuButton color="success" variant="solid" disabled>
      <template #before>
        <LoaderCircle :size="16" class="animate-spin" />
      </template>
      Loading...
    </SuButton>
    <SuButton color="warning" variant="outline" disabled>
      <template #before>
        <Loader :size="16" class="animate-spin" />
      </template>
      Loading...
    </SuButton>
  </div>
</template>
