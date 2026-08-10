<script setup lang="ts">
import { computed } from 'vue';
import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import { getRegistry } from '@soybeanjs/theme';
import type { BaseColorKey } from '@soybeanjs/theme';
import SSelect from '../select/select.vue';
import type { SelectOptionData } from '../select/types';
import ColorDecorator from './color-decorator.vue';
import { useThemeCustomizerLocale } from './use-locale';

interface Props {
  decorateLevels?: PaletteColorLevel[];
}

defineProps<Props>();

const { resolveOption } = useThemeCustomizerLocale();

const palette = defineModel<BaseColorKey>({
  required: true
});

const baseRegistry = getRegistry().base;

const currentColors = computed(() => baseRegistry[palette.value].colors);

const items = computed<SelectOptionData<BaseColorKey>[]>(() =>
  Object.keys(baseRegistry).map(key => ({
    label: resolveOption('palette', key),
    value: key
  }))
);
</script>

<template>
  <SSelect v-model="palette" :items="items">
    <template #trigger-leading>
      <ColorDecorator :colors="currentColors" :levels="decorateLevels" />
    </template>
    <template #item-leading="{ item }">
      <ColorDecorator :colors="baseRegistry[item.value].colors" :levels="decorateLevels" />
    </template>
  </SSelect>
</template>
