<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SButtonGroup, SCard, SSelect } from 'soy-ui';
import type { ButtonShadow, ButtonShape, ButtonVariant, SelectOption, ThemeColor, ThemeSize } from 'soy-ui';

const activeColor = ref<ThemeColor>('primary');
const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const colorOptions: SelectOption[] = colors.map(color => ({
  label: color,
  value: color
}));

const activeVariant = ref<ButtonVariant>('solid');
const variants: ButtonVariant[] = ['solid', 'pure', 'plain', 'outline', 'dashed', 'soft', 'ghost', 'link'];
const variantOptions: SelectOption[] = variants.map(variant => ({
  label: variant,
  value: variant
}));

const activeSize = ref<ThemeSize>('md');
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const sizeOptions: SelectOption[] = sizes.map(size => ({
  label: size,
  value: size
}));

const activeShape = ref<ButtonShape>('auto');
const shapes: ButtonShape[] = ['auto', 'square', 'circle', 'rounded'];
const shapeOptions: SelectOption[] = shapes.map(shape => ({
  label: shape,
  value: shape
}));

const activeShadow = ref<ButtonShadow>('sm');
const shadows: ButtonShadow[] = ['none', 'sm', 'md', 'lg'];
const shadowOptions: SelectOption[] = shadows.map(shadow => ({
  label: shadow,
  value: shadow
}));
</script>

<template>
  <div class="flex-c-stretch gap-6">
    <div class="flex flex-wrap gap-3">
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default!">color</SButton>
        <SSelect v-model="activeColor" :items="colorOptions" side="bottom" align="end" trigger-class="w-30" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default!">variant</SButton>
        <SSelect v-model="activeVariant" :items="variantOptions" side="bottom" align="end" trigger-class="w-25" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default!">size</SButton>
        <SSelect v-model="activeSize" :items="sizeOptions" side="bottom" align="end" trigger-class="w-20" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default!">shape</SButton>
        <SSelect v-model="activeShape" :items="shapeOptions" side="bottom" align="end" trigger-class="w-25" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default!">shadow</SButton>
        <SSelect v-model="activeShadow" :items="shadowOptions" side="bottom" align="end" trigger-class="w-20" />
      </SButtonGroup>
    </div>
    <SCard title="Color" split>
      <div class="flex flex-wrap gap-12px">
        <SButton
          v-for="color in colors"
          :key="color"
          :color="color"
          :variant="activeVariant"
          :size="activeSize"
          :shape="activeShape"
          :shadow="activeShadow"
        >
          {{ color }}
        </SButton>
      </div>
    </SCard>
    <SCard title="Variant" split>
      <div class="flex flex-wrap gap-12px">
        <SButton
          v-for="variant in variants"
          :key="variant"
          :color="activeColor"
          :variant="variant"
          :size="activeSize"
          :shape="activeShape"
          :shadow="activeShadow"
        >
          {{ variant }}
        </SButton>
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-wrap gap-12px">
        <SButton
          v-for="size in sizes"
          :key="size"
          :color="activeColor"
          :variant="activeVariant"
          :size="size"
          :shape="activeShape"
          :shadow="activeShadow"
        >
          {{ size }}
        </SButton>
      </div>
    </SCard>
    <SCard title="Shape" split>
      <div class="flex flex-wrap gap-12px">
        <SButton
          v-for="shape in shapes"
          :key="shape"
          :color="activeColor"
          :variant="activeVariant"
          :size="activeSize"
          :shape="shape"
          :shadow="activeShadow"
        >
          {{ shape }}
        </SButton>
      </div>
    </SCard>
    <SCard title="Shadow" split>
      <div class="flex flex-wrap gap-12px">
        <SButton
          v-for="shadow in shadows"
          :key="shadow"
          :color="activeColor"
          :variant="activeVariant"
          :size="activeSize"
          :shape="activeShape"
          :shadow="shadow"
        >
          {{ shadow }}
        </SButton>
      </div>
    </SCard>
  </div>
</template>
