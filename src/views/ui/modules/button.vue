<script setup lang="ts">
import { SButton, SButtonIcon, SLoadingButton } from '@soybean-unify/ui';
import type { ButtonColor, ButtonSize, ButtonVariant } from '@soybean-unify/ui';
import { Loader, Minus, Plus } from 'lucide-vue-next';

defineOptions({
  name: 'UiButton'
});

const colors: ButtonColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const variants: ButtonVariant[] = ['solid', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
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
    <SButton v-for="(size, index) in sizes" :key="size" :color="colors[index]" variant="outline" :size="size">
      {{ size }}
    </SButton>
  </div>
  <div class="py-12px text-18px">Shape</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="primary" variant="solid" shape="rounded">rounded</SButton>
    <div class="flex-col-center">
      <SButtonIcon color="destructive" variant="plain" shape="square">
        <Minus />
      </SButtonIcon>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-col-center">
      <SButtonIcon color="success" variant="outline" shape="circle">
        <Plus />
      </SButtonIcon>
      <div class="text-12px text-#666">circle</div>
    </div>
    <div class="flex-col-center">
      <SButtonIcon color="warning" variant="dashed" shape="square">
        <Plus />
      </SButtonIcon>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-col-center">
      <SButtonIcon shape="circle">
        <Minus />
      </SButtonIcon>
      <div class="text-12px text-#666">circle</div>
    </div>
  </div>
  <div class="py-12px text-18px">Slot</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="primary">
      <template #before>
        <Plus />
      </template>
      Before
    </SButton>
    <SButton color="destructive" variant="outline">
      After
      <template #after>
        <Minus />
      </template>
    </SButton>
    <SButton color="success" variant="dashed">
      <template #before>
        <Plus />
      </template>
      Both
      <template #after>
        <Minus />
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
    <SLoadingButton color="success" variant="solid" loading>Loading...</SLoadingButton>
    <SLoadingButton color="warning" variant="outline" loading>
      <template #loading>
        <Loader class="animate-spin" />
      </template>
      Loading...
    </SLoadingButton>
  </div>
</template>
