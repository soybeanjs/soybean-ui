<script setup lang="ts">
import { computed } from 'vue';
import { getRegistry, resolveColorValue } from '@soybeanjs/theme';
import type { ColorValue, PaletteColorLevel, SidebarSchemeKey } from '@soybeanjs/theme';
import SSelect from '../select/select.vue';
import type { SelectOptionData } from '../select/types';
import ColorDecorator from './color-decorator.vue';
import { useThemeCustomizerLocale } from './use-locale';

const palette = defineModel<SidebarSchemeKey>({
  required: true
});

const { resolveOption } = useThemeCustomizerLocale();

const feedbackRegistry = getRegistry().sidebar;

const decorateColors: Record<SidebarSchemeKey, ColorValue> = {
  derived: 'slate.200',
  'inverted-dark': 'yellow.400',
  soft: 'orange.200',
  contrast: 'purple.600'
};

const currentColors = computed(() => {
  const color = decorateColors[palette.value];

  return {
    50: resolveColorValue(color, 'hsl')
  };
});

const allColors = Object.entries(decorateColors)
  .map(([key, value]) => ({
    key,
    colors: {
      50: resolveColorValue(value, 'hsl')
    }
  }))
  .reduce(
    (prev, cur) => ({ ...prev, [cur.key]: cur.colors }),
    {} as Record<SidebarSchemeKey, Record<PaletteColorLevel, string>>
  );

const items = computed<SelectOptionData<SidebarSchemeKey>[]>(() =>
  Object.keys(feedbackRegistry).map(key => ({
    label: resolveOption('sidebar', key),
    value: key
  }))
);
</script>

<template>
  <SSelect v-model="palette" :items="items">
    <template #trigger-leading>
      <ColorDecorator :colors="currentColors" :levels="[50]" />
    </template>
    <template #item-leading="{ item }">
      <ColorDecorator :colors="allColors[item.value]" :levels="[50]" />
    </template>
  </SSelect>
</template>
