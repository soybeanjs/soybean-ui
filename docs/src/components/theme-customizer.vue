<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { builtinColorMap } from '@soybeanjs/unocss-shadcn/shared';
import type { ThemeConfigColor } from '@soybeanjs/unocss-shadcn';
import { SButton, SIcon, SLabel } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';
import { useTheme } from '../theme';

const { color, radius, size } = useTheme('ThemeCustomizer');

const isMobile = useMediaQuery('(max-width: 768px)');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const radiuses: number[] = [0, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

function setTheme(item: ThemeConfigColor) {
  color.value = item;
}

function setRadius(item: number) {
  radius.value = item;
}

function setSize(item: ThemeSize) {
  size.value = item;
}
</script>

<template>
  <SPopover :ui="{ popup: 'z-51' }" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <div>
      <div class="grid space-y-1">
        <h1 class="text-md text-foreground font-semibold">Customize</h1>
        <p class="text-xs text-muted-foreground">Pick a style and color for your components.</p>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="color" class="text-xs">Color</SLabel>
        <div class="grid md:grid-cols-3 grid-cols-2 gap-2 py-1.5">
          <div
            v-for="(value, key) in builtinColorMap"
            :key="key"
            :class="{ 'md:col-span-3 col-span-2': key === 'default' }"
          >
            <SButton
              :variant="color === key ? 'outline' : 'pure'"
              size="sm"
              class="justify-between!"
              :class="{ 'w-full': key !== 'default' }"
              @click="setTheme(key)"
            >
              <span
                class="size-4 flex shrink-0 items-center justify-center rounded-full"
                :style="{ backgroundColor: `hsl(${value})` }"
              >
                <SIcon v-if="color === key" icon="lucide:check" class="size-3 text-white" />
              </span>
              <span class="capitalize">
                {{ key }}
              </span>
            </SButton>
          </div>
        </div>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="radius" class="text-xs">Radius</SLabel>
        <div class="grid grid-cols-4 gap-2 py-1.5">
          <SButton
            v-for="(r, index) in radiuses"
            :key="index"
            :variant="r === radius ? 'outline' : 'pure'"
            size="sm"
            @click="setRadius(r)"
          >
            <span class="text-xs">{{ r }}</span>
          </SButton>
        </div>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="size" class="text-xs">Size</SLabel>
        <div class="grid grid-cols-3 gap-2 py-1.5">
          <SButton
            v-for="(s, index) in sizes"
            :key="index"
            :variant="s === size ? 'outline' : 'pure'"
            size="sm"
            @click="setSize(s)"
          >
            <span class="text-xs">{{ s }}</span>
          </SButton>
        </div>
      </div>
    </div>
  </SPopover>
</template>
