<script setup lang="ts">
import { SButton, SButtonGroup, SButtonIcon, SButtonLink, SCard, SLoadingButton } from 'soy-ui';
import type { ButtonShadow, ButtonVariant, ThemeColor, ThemeSize } from 'soy-ui';
import { Loader, Minus, Pause, Plus, SkipBack, SkipForward } from 'lucide-vue-next';

defineOptions({
  name: 'DemoButton'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex flex-wrap gap-12px">
        <SButton v-for="color in colors" :key="color" :color="color">{{ color }}</SButton>
      </div>
    </SCard>
    <SCard title="Variant" split>
      <div class="flex-c-stretch gap-12px">
        <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
          <SButton v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</SButton>
        </div>
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-wrap gap-12px">
        <SButton v-for="(size, index) in sizes" :key="size" :color="colors[index]" variant="outline" :size="size">
          {{ size }}
        </SButton>
      </div>
    </SCard>

    <SCard title="Shape" split>
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
    </SCard>
    <SCard title="Shadow" split>
      <div class="flex flex-wrap gap-12px">
        <SButton v-for="(item, index) in shadows" :key="item" :color="colors[index]" variant="plain" :shadow="item">
          {{ item }}
        </SButton>
      </div>
    </SCard>
    <SCard title="Slot" split>
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
    </SCard>
    <SCard title="Disabled" split>
      <div class="flex flex-wrap gap-12px">
        <SButton color="destructive" variant="solid" disabled>disabled</SButton>
        <SButton color="success" variant="outline" disabled>disabled</SButton>
        <SButton color="warning" variant="dashed" disabled>disabled</SButton>
      </div>
    </SCard>
    <SCard title="Loading" split>
      <div class="flex flex-wrap gap-12px">
        <SLoadingButton color="success" variant="solid" loading>Loading...</SLoadingButton>
        <SLoadingButton color="warning" variant="outline" loading>
          <template #loading>
            <Loader class="animate-spin" />
          </template>
          Loading...
        </SLoadingButton>
      </div>
    </SCard>
    <SCard title="Link" split>
      <div class="flex flex-wrap gap-12px">
        <SButtonLink href="https://soybeanjs.cn">soybeanjs.cn</SButtonLink>
      </div>
    </SCard>
    <SCard title="Button Group" split>
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
    </SCard>
    <SCard title="Button Group vertical" split>
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
    </SCard>
    <SCard title="Button Icon" split>
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
    </SCard>
    <SCard title="Button Icon: fitContent" split>
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
    </SCard>
  </div>
</template>
