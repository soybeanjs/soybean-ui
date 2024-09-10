<script setup lang="ts">
import { ref } from 'vue';
import { SSwitch } from 'soybean-ui';
import type { SwitchColor, SwitchRound, SwitchSize } from 'packages/ui-variants/src';

defineOptions({
  name: 'UiSwitch'
});
const colors: SwitchColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const sizes: SwitchSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const rounds: SwitchRound[] = ['none', 'small', 'full'];
const checked = ref(false);
const str = ref(1);
const handleChange = (val: boolean) => {
  str.value += val ? 1 : 0;
};
</script>

<template>
  <div class="mb-2 text-[18px]">Color</div>
  <SSwitch v-for="color in colors" :key="color" class="mr-2" :bg-color="color"></SSwitch>
  <div class="mb-2 text-[18px]">Size</div>
  <SSwitch v-for="size in sizes" :key="size" :size="size" class="mr-2"></SSwitch>

  <div class="mb-2 text-[18px]">
    Function: {{ checked ? 'checked' : 'unchecked' }}
    <span>{{ str }}</span>
  </div>
  <SSwitch v-model:checked="checked" class="mr-2" @update:checked="handleChange"></SSwitch>
  <div class="mb-2 text-[18px]">Disabled</div>
  <SSwitch
    v-for="color in colors"
    :key="color"
    class="mr-2"
    :bg-color="color"
    :default-checked="true"
    :disabled="true"
  ></SSwitch>
  <div class="mb-2 text-[18px]">DefaultValues</div>
  <SSwitch :default-checked="true"></SSwitch>
  <div class="mb-2 text-[18px]">Round</div>
  <SSwitch v-for="round in rounds" :key="round" class="mr-2" :round="round"></SSwitch>
  <div class="mb-2 text-[18px]">Loading</div>
  <div class="flex flex-wrap gap-2">
    <SSwitch loading></SSwitch>
    <SSwitch loading bg-color="info" round="none"></SSwitch>
    <SSwitch size="lg" loading>
      <template #switch-icon>😂</template>
    </SSwitch>
    <SSwitch size="xl" loading bg-color="success"></SSwitch>
  </div>
  <div class="mb-2 text-[18px]">Icon</div>
  <SSwitch v-for="size in sizes" :key="size" :size="size" class="mr-2">
    <template #switch-icon>😂</template>
  </SSwitch>
</template>

<style lang="scss" scoped></style>
