<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import { builtinBasePresetKeys, builtinPrimaryPresetKeys, THEME_RADIUS } from '@soybeanjs/theme';
import type { BuiltinBasePresetKey, BuiltinPrimaryPresetKey, ThemeRadius } from '@soybeanjs/theme';
import { SButton, SButtonIcon, SLabel, SPopover, SSelect, useTheme } from '@soybeanjs/ui';
import type { SelectOptionData, ThemeSize } from '@soybeanjs/ui';

const isMobile = useMediaQuery('(max-width: 768px)');

const {
  base,
  primary,
  radius,
  size,
  setRadius,
  setSize,
  customPresets,
  appliedPresetName,
  savePreset,
  removePreset,
  applyPreset
} = useTheme('ThemeConfigurator');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const radiuses = Object.keys(THEME_RADIUS) as ThemeRadius[];

const baseOptions: SelectOptionData<BuiltinBasePresetKey>[] = builtinBasePresetKeys.map(key => ({
  label: key,
  value: key
}));

const primaryOptions: SelectOptionData<BuiltinPrimaryPresetKey>[] = builtinPrimaryPresetKeys.map(key => ({
  label: key,
  value: key
}));

const newPresetName = ref('');

const customPresetNames = computed(() => Object.keys(customPresets.value));

const handleSavePreset = () => {
  if (!newPresetName.value) return;

  if (savePreset(newPresetName.value)) {
    newPresetName.value = '';
  }
};
</script>

<template>
  <SPopover :modal="false" :placement="isMobile ? 'left' : 'bottom-end'">
    <template #trigger>
      <SButtonIcon icon="lucide:swatch-book" size="lg" />
    </template>
    <div>
      <div class="grid space-y-1">
        <h1 class="text-md text-foreground font-semibold">Customize</h1>
        <p class="text-xs text-muted-foreground">Pick a style and color for your components.</p>
      </div>
      <div class="flex-y-center justify-between gap-6 pt-6">
        <SLabel for="color" class="shrink-0 text-xs">Base Color</SLabel>
        <SSelect v-model="base" :items="baseOptions" class="w-50">
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
      <div class="flex-y-center justify-between gap-6 pt-6">
        <SLabel for="color" class="text-xs">Theme Color</SLabel>
        <SSelect v-model="primary" :items="primaryOptions" class="w-50">
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
        <div class="grid grid-cols-6 gap-2 py-1.5">
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
      <div class="border-t pt-4 mt-4 space-y-2">
        <SLabel for="preset" class="text-xs">Custom Preset</SLabel>
        <div class="flex-y-center gap-2">
          <input
            v-model="newPresetName"
            class="h-8 w-full rounded-md border border-input bg-transparent px-2 text-xs outline-none"
            placeholder="preset name"
          />
          <SButton size="sm" :disabled="!newPresetName" @click="handleSavePreset">Save</SButton>
        </div>
        <div v-if="customPresetNames.length" class="space-y-1 pt-1">
          <div v-for="name in customPresetNames" :key="name" class="flex-y-center gap-2">
            <SButton
              size="sm"
              :variant="name === appliedPresetName ? 'outline' : 'pure'"
              class="w-full"
              @click="applyPreset(name)"
            >
              {{ name }}
            </SButton>
            <SButtonIcon size="sm" variant="ghost" icon="lucide:trash-2" @click="removePreset(name)" />
          </div>
        </div>
      </div>
    </div>
  </SPopover>
</template>
