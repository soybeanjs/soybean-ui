<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import { builtinBasePresetKeys, builtinFeedbackPresetKeys, builtinPrimaryPresetKeys } from '@soybeanjs/shadcn-theme';
import type { BuiltinBasePresetKey, BuiltinFeedbackPresetKey, BuiltinPrimaryPresetKey } from '@soybeanjs/shadcn-theme';
import { SButton, SButtonIcon, SLabel, SPopover, SSelect } from '@soybeanjs/ui';
import type { SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { useTheme } from '../theme';

const isMobile = useMediaQuery('(max-width: 768px)');

const { base, primary, feedback, radius, size, setRadius, setSize } = useTheme('ThemeConfigurator');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const radiuses: number[] = [0, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

const baseOptions: SelectOptionData<BuiltinBasePresetKey>[] = builtinBasePresetKeys.map(key => ({
  label: key,
  value: key
}));

const primaryOptions: SelectOptionData<BuiltinPrimaryPresetKey>[] = builtinPrimaryPresetKeys.map(key => ({
  label: key,
  value: key
}));

const feedbackOptions: SelectOptionData<BuiltinFeedbackPresetKey>[] = builtinFeedbackPresetKeys.map(key => ({
  label: key,
  value: key
}));

const randomColor = () => {
  const index = Math.floor(Math.random() * builtinPrimaryPresetKeys.length);

  const key = builtinPrimaryPresetKeys[index];

  return tailwindPalette[key][500].hsl;
};

const feedbackBg = Object.fromEntries(builtinFeedbackPresetKeys.map(key => [key, randomColor()])) as Record<
  BuiltinFeedbackPresetKey,
  string
>;

const themeConfiguratorSelectUi = {
  popup: 'docs-theme-configurator-select-popup',
  viewport: 'docs-theme-configurator-select-viewport',
  groupLabel: 'docs-theme-configurator-select-group-label',
  item: 'docs-theme-configurator-select-item',
  itemIndicator: 'docs-theme-configurator-select-item-indicator',
  separator: 'docs-theme-configurator-select-separator'
} as const;
</script>

<template>
  <SPopover :modal="true" :placement="isMobile ? 'left' : 'bottom-end'" class="docs-theme-configurator-popup">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <div class="docs-theme-configurator-panel">
      <div class="docs-theme-configurator-header grid space-y-1">
        <h1 class="text-md text-foreground font-semibold">Customize</h1>
        <p class="text-xs text-muted-foreground">Pick a style and color for your components.</p>
      </div>
      <div class="docs-theme-configurator-row flex-y-center justify-between gap-6 pt-6">
        <SLabel for="color" class="docs-theme-configurator-label shrink-0 text-xs">Base Color</SLabel>
        <SSelect
          v-model="base"
          :items="baseOptions"
          class="docs-theme-configurator-select-trigger w-50"
          :ui="themeConfiguratorSelectUi"
        >
          <template #trigger-leading>
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: tailwindPalette[base][500].hsl }"
            />
          </template>
          <template #item-leading="{ item }">
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: tailwindPalette[item.value][500].hsl }"
            />
          </template>
        </SSelect>
      </div>
      <div class="docs-theme-configurator-row flex-y-center justify-between gap-6 pt-6">
        <SLabel for="color" class="docs-theme-configurator-label text-xs">Theme Color</SLabel>
        <SSelect
          v-model="primary"
          :items="primaryOptions"
          class="docs-theme-configurator-select-trigger w-50"
          :ui="themeConfiguratorSelectUi"
        >
          <template #trigger-leading>
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: tailwindPalette[primary][500].hsl }"
            />
          </template>
          <template #item-leading="{ item }">
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: tailwindPalette[item.value][500].hsl }"
            />
          </template>
        </SSelect>
      </div>
      <div class="docs-theme-configurator-row flex-y-center justify-between gap-6 pt-6">
        <SLabel for="color" class="docs-theme-configurator-label text-xs">Feedback Color</SLabel>
        <SSelect
          v-model="feedback"
          :items="feedbackOptions"
          class="docs-theme-configurator-select-trigger w-50"
          :ui="themeConfiguratorSelectUi"
        >
          <template #trigger-leading>
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: feedbackBg[feedback] }"
            />
          </template>
          <template #item-leading="{ item }">
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: feedbackBg[item.value] }"
            />
          </template>
        </SSelect>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="radius" class="docs-theme-configurator-label text-xs">Radius</SLabel>
        <div class="docs-theme-configurator-button-grid grid grid-cols-4 gap-2 py-1.5">
          <SButton
            v-for="(r, index) in radiuses"
            :key="index"
            :variant="r === radius ? 'outline' : 'pure'"
            class="docs-theme-configurator-option-button"
            :class="r === radius ? 'docs-theme-configurator-option-button-active' : ''"
            size="sm"
            @click="setRadius(r)"
          >
            <span class="text-xs">{{ r }}</span>
          </SButton>
        </div>
      </div>
      <div class="pt-6 space-y-1.5">
        <SLabel for="size" class="docs-theme-configurator-label text-xs">Size</SLabel>
        <div class="docs-theme-configurator-button-grid grid grid-cols-6 gap-2 py-1.5">
          <SButton
            v-for="(s, index) in sizes"
            :key="index"
            :variant="s === size ? 'outline' : 'pure'"
            class="docs-theme-configurator-option-button"
            :class="s === size ? 'docs-theme-configurator-option-button-active' : ''"
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
