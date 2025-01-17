<script setup lang="ts">
import { SButton, SButtonGroup, SButtonIcon, SButtonLink, SLoadingButton } from 'soy-ui';
import type { ButtonShadow, ButtonVariant, ThemeColor, ThemeSize } from 'soy-ui';
import { Loader, Minus, Pause, Plus, SkipBack, SkipForward } from 'lucide-vue-next';

defineOptions({
  name: 'UiButton'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
  </div>
  <div class="py-12px text-18px">Variant</div>
  <div class="flex-c-stretch gap-12px">
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
    <div class="flex-c-center">
      <SButtonIcon color="destructive" variant="plain" shape="square">
        <Minus />
      </SButtonIcon>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-c-center">
      <SButtonIcon color="success" variant="outline" shape="circle">
        <Plus />
      </SButtonIcon>
      <div class="text-12px text-#666">circle</div>
    </div>
    <div class="flex-c-center">
      <SButtonIcon color="warning" variant="dashed" shape="square">
        <Plus />
      </SButtonIcon>
      <div class="text-12px text-#666">square</div>
    </div>
    <div class="flex-c-center">
      <SButtonIcon shape="circle">
        <Minus />
      </SButtonIcon>
      <div class="text-12px text-#666">circle</div>
    </div>
  </div>
  <div class="py-12px text-18px">Shadow</div>
  <div class="flex flex-wrap gap-12px">
    <SButton v-for="(item, index) in shadows" :key="item" :color="colors[index]" variant="plain" :shadow="item">
      {{ item }}
    </SButton>
  </div>
  <div class="py-12px text-18px">Slot</div>
  <div class="flex flex-wrap gap-12px">
    <SButton color="primary">
      <template #leading>
        <Plus />
      </template>
      leading
    </SButton>
    <SButton color="destructive" variant="outline">
      After
      <template #trailing>
        <Minus />
      </template>
    </SButton>
    <SButton color="success" variant="dashed">
      <template #leading>
        <Plus />
      </template>
      Both
      <template #trailing>
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
  <div class="py-12px text-18px">Link</div>
  <div class="flex flex-wrap gap-12px">
    <SButtonLink href="https://soybeanjs.cn">soybeanjs.cn</SButtonLink>
    <SButtonLink to="/demo">Demo Route</SButtonLink>
  </div>
  <div class="py-12px text-18px">Button Group</div>
  <div class="flex flex-wrap gap-12px">
    <SButtonGroup>
      <SButton variant="outline">
        <SkipBack />
      </SButton>
      <SButton variant="outline">
        <Pause />
      </SButton>
      <SButton variant="outline">
        <SkipForward />
      </SButton>
    </SButtonGroup>
    <SButtonGroup>
      <SButton color="destructive" variant="outline">
        <SkipBack />
      </SButton>
      <SButton color="destructive" variant="outline">
        <SkipForward />
      </SButton>
    </SButtonGroup>
  </div>
  <div class="py-12px text-18px">Button Group vertical</div>
  <div class="w-100px">
    <SButtonGroup orientation="vertical">
      <SButton variant="dashed">
        <SkipBack />
      </SButton>
      <SButton variant="dashed">
        <Pause />
      </SButton>
      <SButton variant="dashed">
        <SkipForward />
      </SButton>
    </SButtonGroup>
  </div>
  <div class="py-12px text-18px">Button Icon</div>
  <div class="flex flex-wrap gap-12px">
    <SButtonIcon>
      <SkipBack />
    </SButtonIcon>
    <SButtonIcon>
      <SkipForward />
    </SButtonIcon>
    <SButtonIcon>
      <Pause />
    </SButtonIcon>
  </div>
  <div class="py-12px text-18px">Button Icon: fitContent</div>
  <div class="flex flex-wrap gap-12px">
    <SButtonIcon fit-content class="p-0.5 text-xl">
      <SkipBack />
    </SButtonIcon>
    <SButtonIcon fit-content class="p-0.5 text-xl">
      <SkipForward />
    </SButtonIcon>
    <SButtonIcon fit-content class="p-0.5 text-xl">
      <Pause />
    </SButtonIcon>
  </div>
</template>
