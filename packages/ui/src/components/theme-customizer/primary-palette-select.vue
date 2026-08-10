<script setup lang="ts">
import { computed } from 'vue';
import type { PaletteColorLevel } from '@soybeanjs/colord/palette';
import { getRegistry } from '@soybeanjs/theme';
import type { PrimaryColorKey } from '@soybeanjs/theme';
import SSelect from '../select/select.vue';
import type { SelectOptionData } from '../select/types';
import ColorDecorator from './color-decorator.vue';
import { useThemeCustomizerLocale } from './use-locale';

interface Props {
  decorateLevels?: PaletteColorLevel[];
}

defineProps<Props>();

const { resolveOption } = useThemeCustomizerLocale();

const palette = defineModel<PrimaryColorKey>({
  required: true
});

const primaryRegistry = getRegistry().primary;

const currentColors = computed(() => primaryRegistry[palette.value].colors);

const items = computed<SelectOptionData<PrimaryColorKey>[]>(() =>
  Object.keys(primaryRegistry).map(key => ({
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
      <ColorDecorator :colors="primaryRegistry[item.value].colors" :levels="decorateLevels" />
    </template>
  </SSelect>
</template>
