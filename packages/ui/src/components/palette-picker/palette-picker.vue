<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { generateNearestPalette, generatePalette, tailwindPalette } from '@soybeanjs/colord/palette';
import type { PaletteColorLevel, TailwindPaletteKey } from '@soybeanjs/colord/palette';
import type { ColorValue } from '@soybeanjs/theme';
import SColorPicker from '../color-picker/color-picker.vue';
import SSelect from '../select/select.vue';
import type { SelectOptionData } from '../select/types';
import SSwitch from '../switch/switch.vue';
import { useThemeLocale } from '../theme-customizer/locale';
import STooltip from '../tooltip/tooltip.vue';
import {
  DEFAULT_LEVEL,
  PALETTE_LEVELS,
  SIMPLE_KEYS,
  TAILWIND_KEYS,
  deriveNearestLevel,
  deriveSelectValue,
  deriveTailLevel,
  isTailwindKey,
  itemColorKeyOf,
  outputFormatOf,
  serializeColor,
  simpleCssColor,
  toCssColor
} from './shared';
import type { PaletteChangePayload, PalettePickerEmits, PalettePickerProps, PaletteSelectValue } from './types';

defineOptions({
  name: 'SPalettePicker'
});

const props = withDefaults(defineProps<PalettePickerProps>(), {
  size: 'md',
  format: 'hsl'
});

const model = defineModel<ColorValue>({
  required: true
});

const emit = defineEmits<PalettePickerEmits>();

const messages = useThemeLocale();
const palettePickerMessages = computed(() => messages.value.palettePicker);
const paletteLabels = computed(() => messages.value.options.palette);
const simpleLabels = computed(() => palettePickerMessages.value.simpleKeys);

// —— 顶层选择：custom / tailwind key / simple key ——
const selectValue = ref<PaletteSelectValue>(deriveSelectValue(model.value));
const tailLevel = ref<PaletteColorLevel>(deriveTailLevel(model.value));

// —— custom 面板内部状态 ——
const customColor = ref<string>(selectValue.value === 'custom' ? String(model.value) : '#6366f1');
const recommended = ref(false);
const customLevel = ref<PaletteColorLevel>(DEFAULT_LEVEL);

const outputFormat = computed(() => outputFormatOf(props.format));
const itemColorKey = computed(() => itemColorKeyOf(props.format));

const isCustom = computed(() => selectValue.value === 'custom');
const isTailwind = computed(() => isTailwindKey(selectValue.value));
const selectedKey = computed<TailwindPaletteKey | null>(() =>
  isTailwindKey(selectValue.value) ? selectValue.value : null
);

// —— 选择内置颜色时，level 重置为 500；切换到自定义时，把之前选中的颜色作为自定义初始值 ——
watch(selectValue, value => {
  if (isTailwindKey(value)) {
    tailLevel.value = DEFAULT_LEVEL;
    return;
  }

  if (value === 'custom') {
    customColor.value = toCssColor(model.value);
  }
});

const optionLabelOf = (value: PaletteSelectValue): string => {
  if (value === 'custom') {
    return palettePickerMessages.value.custom;
  }

  if (isTailwindKey(value)) {
    return paletteLabels.value[value] ?? value;
  }

  return simpleLabels.value[value] ?? value;
};

const options = computed<SelectOptionData<PaletteSelectValue>[]>(() => [
  { label: optionLabelOf('custom'), value: 'custom' },
  ...TAILWIND_KEYS.map(key => ({ label: optionLabelOf(key), value: key })),
  ...SIMPLE_KEYS.map(key => ({ label: optionLabelOf(key), value: key }))
]);

const currentCss = computed(() => toCssColor(model.value));

// —— custom 生成：推荐色板开启时吸附到最近 tailwind 色板，否则自由生成 ——
const nearest = computed(() => (recommended.value ? generateNearestPalette(customColor.value, 'oklchString') : null));

const customPalette = computed<Partial<Record<PaletteColorLevel, string>>>(() => {
  if (nearest.value) {
    return nearest.value.palette;
  }

  return generatePalette(customColor.value, outputFormat.value);
});

const tailwindPaletteLevels = computed<Partial<Record<PaletteColorLevel, string>>>(() => {
  const key = selectedKey.value;

  if (!key) {
    return {};
  }

  return Object.fromEntries(PALETTE_LEVELS.map(level => [level, tailwindPalette[key][level][itemColorKey.value]]));
});

// —— 结果推导：提交到 modelValue ——
const result = computed<ColorValue>(() => {
  if (isCustom.value) {
    // 推荐色板开启时提交最近 tailwind 色板的 key.level；否则提交原始色值序列化结果
    if (nearest.value) {
      return `${nearest.value.paletteKey}.${customLevel.value}` as ColorValue;
    }

    return serializeColor(customColor.value, props.format);
  }

  if (isTailwind.value) {
    return `${selectValue.value}.${tailLevel.value}` as ColorValue;
  }

  return selectValue.value as ColorValue;
});

const activePalette = computed<Partial<Record<PaletteColorLevel, string>>>(() => {
  if (isCustom.value) {
    return customPalette.value;
  }

  if (isTailwind.value) {
    return tailwindPaletteLevels.value;
  }

  return {};
});

const emitChange = (): void => {
  model.value = result.value;

  const payload: PaletteChangePayload = {
    value: result.value,
    palette: activePalette.value,
    recommended: recommended.value
  };

  emit('paletteChange', payload);
};

const optionColor = (value: PaletteSelectValue): string => {
  if (value === 'custom') {
    return currentCss.value;
  }

  if (isTailwindKey(value)) {
    return tailwindPalette[value][DEFAULT_LEVEL].hsl;
  }

  return simpleCssColor(value);
};

watch([selectValue, tailLevel, customColor, recommended, customLevel], () => emitChange());

// —— 推荐色板开关从开启切到关闭时，基于当前颜色重新生成色板（computed 自动重算），
//     主色即当前颜色(500)，因此把高亮重置到 500 ——
watch(recommended, (value, prev) => {
  if (prev && !value) {
    customLevel.value = DEFAULT_LEVEL;
  }
});

// —— 色块点击时抑制颜色选择器触发的层级推导，避免覆盖主动选择的层级 ——
const applyingSwatch = ref(false);

// —— 通过颜色选择器选色时，高亮最接近的色板层级 ——
watch(customColor, value => {
  if (isCustom.value && !applyingSwatch.value) {
    customLevel.value = deriveNearestLevel(value, props.format);
  }
});

// —— 点击自定义色板色块 ——
const onCustomLevelClick = (level: PaletteColorLevel): void => {
  // 推荐色板模式：色板固定吸附到某个 tailwind 色板，点击色块同步选中层级，
  // 并把颜色选择器联动到该色块颜色（色块是吸附色板的精确颜色，重新吸附仍
  // 落在同一色板，因此色板保持稳定）。
  if (recommended.value) {
    const target = customPalette.value[level];

    if (target) {
      applyingSwatch.value = true;
      customColor.value = target;
      customLevel.value = level;
      void nextTick(() => {
        applyingSwatch.value = false;
      });
    }

    return;
  }

  // 自由生成模式：点击的色块成为新的主色(500)，基于它重新调用
  // generatePalette 生成新色板。色块点击是主动选择，颜色选择器变化
  // 触发的层级推导不应被触发，避免覆盖刚设为 500 的主色。
  const target = customPalette.value[level];

  if (target) {
    applyingSwatch.value = true;
    customColor.value = target;
    customLevel.value = DEFAULT_LEVEL;
    void nextTick(() => {
      applyingSwatch.value = false;
    });
  }
};

// —— 受控模式：外部写入 modelValue 时回填内部状态 ——
watch(
  () => model.value,
  value => {
    if (value === result.value) {
      return;
    }

    selectValue.value = deriveSelectValue(value);
    tailLevel.value = deriveTailLevel(value);

    if (deriveSelectValue(value) === 'custom') {
      customColor.value = String(value);
      customLevel.value = deriveNearestLevel(String(value), props.format);
    }
  }
);
</script>

<template>
  <div class="space-y-3">
    <SSelect v-model="selectValue" :items="options" :size="size">
      <template #trigger-leading>
        <span class="size-4 shrink-0 rounded-full border" :style="{ backgroundColor: currentCss }" />
      </template>
      <template #item-leading="{ item }">
        <span class="size-4 shrink-0 rounded-full border" :style="{ backgroundColor: optionColor(item.value) }" />
      </template>
    </SSelect>

    <!-- tailwind level selector -->
    <div v-if="isTailwind" class="flex items-center gap-1">
      <STooltip v-for="level in PALETTE_LEVELS" :key="level" :size="size">
        <template #trigger>
          <button
            type="button"
            class="size-5 rounded-full border transition"
            :class="level === tailLevel ? 'ring-2 ring-primary ring-offset-1' : ''"
            :style="{ backgroundColor: tailwindPalette[selectedKey as TailwindPaletteKey][level].hsl }"
            :aria-label="`level ${level}`"
            :aria-pressed="level === tailLevel"
            @click="tailLevel = level"
          />
        </template>
        <span class="text-xs">{{ level }}</span>
      </STooltip>
    </div>

    <!-- custom panel -->
    <div v-if="isCustom" class="space-y-3">
      <SColorPicker v-model="customColor" :size="size" class="w-full" />

      <div class="flex-y-center justify-between">
        <span class="text-xs text-muted-foreground">{{ palettePickerMessages.recommendedPalette }}</span>
        <SSwitch v-model="recommended" :size="size" />
      </div>

      <div class="flex items-center gap-1">
        <STooltip v-for="level in PALETTE_LEVELS" :key="level" :size="size">
          <template #trigger>
            <button
              type="button"
              class="size-5 rounded-full border transition"
              :class="level === customLevel ? 'ring-2 ring-primary ring-offset-1' : ''"
              :style="{ backgroundColor: customPalette[level] }"
              :aria-label="`level ${level}`"
              :aria-pressed="level === customLevel"
              @click="onCustomLevelClick(level)"
            />
          </template>
          <span class="text-xs">{{ level }}</span>
        </STooltip>
      </div>
    </div>
  </div>
</template>
