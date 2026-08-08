<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { themeRadiusKeys, themeSizeKeys } from '@soybeanjs/theme';
import type { ThemeCssVariables } from '@soybeanjs/theme';
import {
  SButton,
  SButtonIcon,
  SColorSwatch,
  SInput,
  SLabel,
  SPopover,
  SSegment,
  SSelect,
  SSlider,
  STabs
} from '@soybeanjs/ui';
import type { SelectOptionData } from '@soybeanjs/ui';
import {
  baseOptions,
  chartKeys,
  chatColor,
  darkLevels,
  lightLevels,
  menuAccentOptions,
  menuColorOptions,
  modeOptions,
  paletteLevels,
  primaryOptions,
  radiusFromIndex,
  radiusIndex,
  radiusLabel,
  shadeColor,
  shadeValues,
  sizeFromIndex,
  sizeIndex,
  sizeLabel,
  surfaces,
  swatchColor,
  tabs,
  tokenGroups
} from './shared';
import type { ShadeValue } from './shared';
import { useThemeGenerator } from './hooks';
import ColorDecoration from './color-decoration.vue';

type Emits = {
  (e: 'getCss', value: ThemeCssVariables): void;
};

const emit = defineEmits<Emits>();

const isMobile = useMediaQuery('(max-width: 768px)');

const {
  activeMode,
  base,
  primary,
  radius,
  size,
  lightLevel,
  darkLevel,
  menuColor,
  menuAccent,
  borderOpacity,
  patchTopLevel,
  patchPreset,
  tokenValue,
  onTokenInput,
  surfaceValue,
  setSurface,
  shadeIndex,
  stepSurface,
  chartPalette,
  chartLevel,
  setChart,
  setBorderOpacity
} = useThemeGenerator(emit);
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <div class="w-[min(90vw,26rem)]">
      <div class="grid space-y-1">
        <h1 class="text-md text-foreground font-semibold">Theme Generator</h1>
        <p class="text-xs text-muted-foreground">Generate a full ConfigProvider theme config.</p>
      </div>

      <div class="flex items-center justify-end pt-4">
        <SSegment v-model="activeMode" :items="modeOptions" size="sm" />
      </div>

      <STabs default-value="generate-theme" :items="tabs" class="pt-2">
        <template #content="{ value }">
          <!-- Generate Theme -->
          <div v-if="value === 'generate-theme'" class="max-h-[60vh] space-y-5 overflow-auto px-2 pt-4">
            <div class="space-y-1.5">
              <SLabel class="text-xs">Base Color</SLabel>
              <SSelect v-model="base" :items="baseOptions" class="w-full">
                <template #trigger-leading>
                  <ColorDecoration :palette="base" />
                </template>
                <template #item-leading="{ item }">
                  <ColorDecoration :palette="item.value" />
                </template>
              </SSelect>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Primary Color</SLabel>
              <SSelect v-model="primary" :items="primaryOptions" class="w-full">
                <template #trigger-leading>
                  <ColorDecoration :palette="primary" />
                </template>
                <template #item-leading="{ item }">
                  <ColorDecoration :palette="item.value" />
                </template>
              </SSelect>
            </div>

            <div class="space-y-1.5">
              <div class="flex gap-2">
                <SLabel class="text-xs">Size</SLabel>
                <STooltip content="Root element size, affects 'rem' unit.">
                  <template #trigger>
                    <SIcon icon="lucide:info" />
                  </template>
                </STooltip>
              </div>
              <div class="flex items-center gap-3 pt-1">
                <SSlider
                  :model-value="[sizeIndex(size)]"
                  :min="0"
                  :max="themeSizeKeys.length - 1"
                  :step="1"
                  class="w-full"
                  @update:model-value="value => patchPreset({ size: sizeFromIndex(value[0]) })"
                />
                <span class="w-15 shrink-0 text-right text-xs text-muted-foreground">{{ sizeLabel(size) }}</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Radius</SLabel>
              <div class="flex items-center gap-3 pt-1">
                <SSlider
                  :model-value="[radiusIndex(radius)]"
                  :min="0"
                  :max="themeRadiusKeys.length - 1"
                  :step="1"
                  class="w-full"
                  @update:model-value="value => patchPreset({ radius: radiusFromIndex(value[0]) })"
                />
                <span class="w-15 shrink-0 text-right text-xs text-muted-foreground">{{ radiusLabel(radius) }}</span>
              </div>
            </div>

            <div v-if="activeMode === 'light'" class="space-y-1.5">
              <SLabel class="text-xs">Light Level</SLabel>
              <div class="grid grid-cols-3 gap-2 py-1.5">
                <SButton
                  v-for="(l, index) in lightLevels"
                  :key="index"
                  :variant="l === lightLevel ? 'outline' : 'pure'"
                  size="sm"
                  @click="patchTopLevel({ lightLevel: l })"
                >
                  <span class="text-xs">{{ l }}</span>
                </SButton>
              </div>
            </div>

            <div v-if="activeMode === 'dark'" class="space-y-1.5">
              <SLabel class="text-xs">Dark Level</SLabel>
              <div class="grid grid-cols-4 gap-2 py-1.5">
                <SButton
                  v-for="(l, index) in darkLevels"
                  :key="index"
                  :variant="l === darkLevel ? 'outline' : 'pure'"
                  size="sm"
                  @click="patchTopLevel({ darkLevel: l })"
                >
                  <span class="text-xs">{{ l }}</span>
                </SButton>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Background Shades</SLabel>
              <div v-for="s in surfaces" :key="s.key" class="flex-y-center justify-between gap-4 pt-1">
                <span class="text-xs text-muted-foreground">{{ s.label }}</span>
                <SButtonGroup variant="pure">
                  <SSelect
                    :model-value="surfaceValue(s.key)"
                    :items="
                      shadeValues.map(shade => ({
                        label: String(shade),
                        value: shade
                      })) as SelectOptionData<ShadeValue>[]
                    "
                    :show-trigger-icon="false"
                    class="w-24"
                    @update:model-value="value => setSurface(s.key, value)"
                  >
                    <template #trigger-leading>
                      <SColorSwatch :color="shadeColor(surfaceValue(s.key), base)" shape="circle" size="xs" />
                    </template>
                    <template #item-leading="{ item }">
                      <SColorSwatch :color="shadeColor(item.value, base)" shape="circle" size="xs" />
                    </template>
                  </SSelect>
                  <SButton :disabled="shadeIndex(s.key) <= 0" @click="stepSurface(s.key, -1)">
                    <SIcon icon="lucide:minus" />
                  </SButton>
                  <SButton :disabled="shadeIndex(s.key) >= shadeValues.length - 1" @click="stepSurface(s.key, 1)">
                    <SIcon icon="lucide:plus" />
                  </SButton>
                </SButtonGroup>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Border Opacity</SLabel>
              <div class="flex items-center gap-3 pt-1">
                <SSlider
                  :model-value="[borderOpacity]"
                  :min="0"
                  :max="100"
                  :step="1"
                  class="w-full"
                  @update:model-value="value => setBorderOpacity(value[0])"
                />
                <span class="w-10 shrink-0 text-right text-xs text-muted-foreground">{{ borderOpacity }}%</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Charts</SLabel>
              <div v-for="(key, index) in chartKeys" :key="key" class="space-y-1 pt-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">{{ key }}</span>
                </div>
                <div class="flex gap-2">
                  <SSelect
                    :model-value="chartPalette(index)"
                    :items="primaryOptions"
                    class="flex-1"
                    @update:model-value="value => setChart(index, value, chartLevel(index))"
                  >
                    <template #trigger-leading>
                      <ColorDecoration :palette="chartPalette(index)" />
                    </template>
                    <template #item-leading="{ item }">
                      <ColorDecoration :palette="item.value" />
                    </template>
                  </SSelect>
                  <SSelect
                    :model-value="chartLevel(index)"
                    :items="paletteLevels.map(level => ({ label: String(level), value: level }))"
                    :show-trigger-icon="false"
                    class="w-24"
                    @update:model-value="value => setChart(index, chartPalette(index), value)"
                  >
                    <template #trigger-leading>
                      <SColorSwatch
                        :color="chatColor(chartPalette(index), chartLevel(index))"
                        shape="circle"
                        size="xs"
                      />
                    </template>
                    <template #item-leading="{ item }">
                      <SColorSwatch :color="chatColor(chartPalette(index), item.value)" shape="circle" size="xs" />
                    </template>
                  </SSelect>
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Menu Color</SLabel>
              <SSelect v-model="menuColor" :items="menuColorOptions" class="w-full" />
            </div>

            <div class="space-y-1.5">
              <SLabel class="text-xs">Menu Accent</SLabel>
              <SSelect v-model="menuAccent" :items="menuAccentOptions" class="w-full" />
            </div>
          </div>

          <!-- Edit Variables -->
          <div v-else class="max-h-[60vh] space-y-5 overflow-auto px-2 pt-4">
            <div v-for="group in tokenGroups" :key="group.label" class="space-y-1.5">
              <SLabel class="text-xs">{{ group.label }}</SLabel>
              <div
                v-for="key in group.keys"
                :key="key"
                class="grid grid-cols-[1.5rem_7rem_1fr] items-center gap-2 py-0.5"
              >
                <SColorSwatch :color="swatchColor(tokenValue(key))" shape="circle" size="sm" />
                <span class="truncate text-xs text-muted-foreground">{{ key }}</span>
                <SInput
                  :model-value="tokenValue(key)"
                  size="sm"
                  placeholder="e.g. zinc.900 / hsl(...)"
                  @update:model-value="value => onTokenInput(key, value)"
                />
              </div>
            </div>
          </div>
        </template>
      </STabs>
    </div>
  </SPopover>
</template>
