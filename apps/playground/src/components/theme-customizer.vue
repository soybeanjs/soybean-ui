<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { SButton, SLabel } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import { builtinColorMap, builtinRadiuses } from '@soybean-ui/unocss-preset';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { Check } from 'lucide-vue-next';

defineOptions({
  name: 'ThemeCustomizer'
});

interface ThemeCustomizeProps {
  color: ThemeConfigColor;
  radius: number;
  size: ThemeSize;
}

const props = defineProps<ThemeCustomizeProps>();

type ThemeCustomizeEmits = {
  (e: 'update:color', value: ThemeConfigColor): void;
  (e: 'update:radius', value: number): void;
  (e: 'update:size', value: ThemeSize): void;
};

const emit = defineEmits<ThemeCustomizeEmits>();

const color = useVModel(props, 'color', emit);
const radius = useVModel(props, 'radius', emit);
const size = useVModel(props, 'size', emit);

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

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
  <div class="p-4">
    <div class="grid space-y-1">
      <h1 class="text-md text-foreground font-semibold">Customize</h1>
      <p class="text-xs text-muted-foreground">Pick a style and color for your components.</p>
    </div>
    <div class="pt-6 space-y-1.5">
      <SLabel for="color" class="text-xs">Color</SLabel>
      <div class="grid grid-cols-3 gap-2 py-1.5">
        <div v-for="(value, key) in builtinColorMap" :key="key" :class="{ 'col-span-3': key === 'default' }">
          <SButton
            :variant="color === key ? 'outline' : 'pure'"
            size="sm"
            class="justify-start"
            :class="{ 'w-full': key !== 'default' }"
            @click="setTheme(key)"
          >
            <span
              class="size-4 flex shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: `hsl(${value})` }"
            >
              <Check v-if="color === key" class="size-3 text-white" />
            </span>
            <span class="ml-2 text-xs capitalize">
              {{ key }}
            </span>
          </SButton>
        </div>
      </div>
    </div>
    <div class="pt-6 space-y-1.5">
      <SLabel for="radius" class="text-xs">Radius</SLabel>
      <div class="grid grid-cols-5 gap-2 py-1.5">
        <SButton
          v-for="(r, index) in builtinRadiuses"
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
      <div class="grid grid-cols-5 gap-2 py-1.5">
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
</template>
