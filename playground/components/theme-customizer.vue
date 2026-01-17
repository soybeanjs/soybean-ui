<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { tailwindPaletteHsl } from '@soybeanjs/colord/palette';
import { basePaletteKeys, feedbackPaletteKeys, themePaletteKeys } from '@soybeanjs/shadcn-theme';
import { SButton, SButtonIcon, SIcon, SLabel, SPopover } from '@soybeanjs/ui';
import type { ThemeSize } from '@soybeanjs/ui';
import { useTheme } from '../theme';

const isMobile = useMediaQuery('(max-width: 768px)');

const {
  basePalette,
  themePalette,
  feedbackPalette,
  radius,
  size,
  setBasePalette,
  setThemePalette,
  setFeedbackPalette,
  setRadius,
  setSize
} = useTheme('ThemeCustomizer');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const radiuses: number[] = [0, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
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
        <SLabel for="color" class="text-xs">Base Palette Color</SLabel>
        <div class="grid md:grid-cols-3 grid-cols-2 gap-2 py-1.5">
          <div v-for="key in basePaletteKeys" :key="key">
            <SButton
              :variant="basePalette === key ? 'outline' : 'pure'"
              size="sm"
              class="w-full justify-between"
              @click="setBasePalette(key)"
            >
              <span
                class="size-4 flex shrink-0 items-center justify-center rounded-full"
                :style="{ backgroundColor: tailwindPaletteHsl[key][500] }"
              >
                <SIcon v-if="basePalette === key" icon="lucide:check" class="size-3 text-white" />
              </span>
              <span class="capitalize">
                {{ key }}
              </span>
            </SButton>
          </div>
        </div>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="color" class="text-xs">Theme Palette Color</SLabel>
        <div class="grid md:grid-cols-3 grid-cols-2 gap-2 py-1.5">
          <div v-for="key in themePaletteKeys" :key="key">
            <SButton
              :variant="themePalette === key ? 'outline' : 'pure'"
              size="sm"
              class="w-full justify-between"
              @click="setThemePalette(key)"
            >
              <span
                class="size-4 flex shrink-0 items-center justify-center rounded-full"
                :style="{ backgroundColor: tailwindPaletteHsl[key][500] }"
              >
                <SIcon v-if="themePalette === key" icon="lucide:check" class="size-3 text-white" />
              </span>
              <span class="capitalize">
                {{ key }}
              </span>
            </SButton>
          </div>
        </div>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="color" class="text-xs">Feedback Palette Color</SLabel>
        <div class="grid md:grid-cols-3 grid-cols-2 gap-2 py-1.5">
          <div v-for="key in feedbackPaletteKeys" :key="key">
            <SButton
              :variant="feedbackPalette === key ? 'outline' : 'pure'"
              size="sm"
              class="w-full justify-between"
              @click="setFeedbackPalette(key)"
            >
              <span class="size-4 flex shrink-0 items-center justify-center rounded-full bg-muted-foreground/30">
                <SIcon v-if="feedbackPalette === key" icon="lucide:check" class="size-3 text-white" />
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
