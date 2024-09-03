<script setup lang="ts">
import { SSwitch } from 'soybean-ui';
import type { SwitchColor, SwitchRound, SwitchSize } from 'packages/ui-variants/src';
import { ref } from 'vue';

defineOptions({
  name: 'UiSwitch'
});
const colors: SwitchColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
const sizes: SwitchSize[] = ['xs', 'sm', 'md', 'lg'];
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
  <SSwitch :disabled="true"></SSwitch>
  <div class="mb-2 text-[18px]">DefaultValues</div>
  <SSwitch :default-checked="true"></SSwitch>
  <div class="mb-2 text-[18px]">Round</div>
  <SSwitch v-for="round in rounds" :key="round" class="mr-2" :round="round"></SSwitch>
  <div class="mb-2 text-[18px]">Loading</div>
  <SSwitch loading></SSwitch>
  <div class="mb-2 text-[18px]">Icon</div>
  <SSwitch>
    <template #switch-icon>😂</template>
  </SSwitch>
</template>

<style lang="scss" scoped></style>
