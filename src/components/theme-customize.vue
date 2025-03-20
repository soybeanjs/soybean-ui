<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { SButton, SLabel } from 'soy-ui';
import { builtinColorMap, builtinRadiuses } from '@soybean-ui/unocss-preset';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { Check } from 'lucide-vue-next';

defineOptions({
  name: 'ThemeCustomize'
});

interface ThemeCustomizeProps {
  color: ThemeConfigColor;
  radius: number;
}

const props = defineProps<ThemeCustomizeProps>();

type ThemeCustomizeEmits = {
  (e: 'update:theme', value: ThemeConfigColor): void;
  (e: 'update:radius', value: number): void;
};

const emit = defineEmits<ThemeCustomizeEmits>();

const color = useVModel(props, 'color', emit);
const radius = useVModel(props, 'radius', emit);

function setTheme(item: ThemeConfigColor) {
  color.value = item;
}

function setRadius(item: number) {
  radius.value = item;
}
</script>

<template>
  <div class="p-4">
    <div class="grid space-y-1">
      <h1 class="text-md text-foreground font-semibold">Customize</h1>
      <p class="text-xs text-muted-foreground">Pick a style and color for your components.</p>
    </div>
    <div class="pt-6 space-y-1.5">
      <SLabel for="color" class="text-xs">Color</SLabel>
      <div class="grid grid-cols-3 gap-2 py-1.5">
        <SButton
          v-for="(value, key) in builtinColorMap"
          :key="key"
          :variant="color === key ? 'outline' : 'pure'"
          class="h-8 justify-start px-3"
          @click="setTheme(key)"
        >
          <span
            class="h-5 w-5 flex shrink-0 items-center justify-center rounded-full"
            :style="{ backgroundColor: `hsl(${value})` }"
          >
            <Check v-if="color === key" class="h-3 w-3 text-white" />
          </span>
          <span class="ml-2 text-xs capitalize">
            {{ key }}
          </span>
        </SButton>
      </div>
    </div>
    <div class="pt-6 space-y-1.5">
      <SLabel for="radius" class="text-xs">Radius</SLabel>
      <div class="grid grid-cols-5 gap-2 py-1.5">
        <SButton
          v-for="(r, index) in builtinRadiuses"
          :key="index"
          :variant="r === radius ? 'outline' : 'pure'"
          class="h-8 justify-center px-3"
          @click="setRadius(r)"
        >
          <span class="text-xs">{{ r }}</span>
        </SButton>
      </div>
    </div>
  </div>
</template>
