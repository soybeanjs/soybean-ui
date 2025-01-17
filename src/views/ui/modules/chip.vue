<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SChip, SInput, SSwitch } from 'soy-ui';
import type { ChipPosition, ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'UiChip'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const positions: ChipPosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];

const text = ref('99+');
const slotText = ref('New');
const show = ref(true);
</script>

<template>
  <div class="w-full flex justify-center"></div>
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Chip Size</div>
    <div class="flex gap-3">
      <div v-for="size in sizes" :key="size">
        <div>{{ size }}</div>
        <SChip :size="size">
          <SButton color="secondary">A</SButton>
        </SChip>
      </div>
    </div>
    <div class="py-12px text-18px">Chip Color</div>
    <div class="flex gap-3">
      <div v-for="color in colors" :key="color">
        <SChip :color="color">
          <SButton variant="dashed">{{ color }}</SButton>
        </SChip>
      </div>
    </div>
    <div class="py-12px text-18px">Chip Color With Text</div>
    <div class="flex gap-4">
      <div v-for="color in colors" :key="color">
        <SChip :color="color" text="99+">
          <SButton variant="dashed">{{ color }}</SButton>
        </SChip>
      </div>
    </div>
    <div class="py-12px text-18px">Chip Positions</div>
    <div class="flex gap-3">
      <div v-for="position in positions" :key="position">
        <SChip :position="position">
          <SButton variant="dashed" class="w-30">{{ position }}</SButton>
        </SChip>
      </div>
    </div>
    <div class="py-12px text-18px">Chip modelValue</div>
    <div class="flex gap-3">
      <SInput v-model="text"></SInput>
      <SChip :text="text">
        <SButton variant="outline">A</SButton>
      </SChip>
    </div>
    <div class="py-12px text-18px">Chip Slot</div>
    <div class="flex gap-3">
      <SInput v-model="slotText"></SInput>
      <SChip :text="slotText">
        <SButton variant="outline">A</SButton>
        <template #content="{ value }">{{ value }}！</template>
      </SChip>
    </div>
    <div class="py-12px text-18px">Chip Show</div>
    <div class="flex gap-3">
      <SSwitch v-model:checked="show"></SSwitch>
      <SChip :show="show">
        <SButton variant="outline">A</SButton>
      </SChip>
    </div>
  </div>
</template>
