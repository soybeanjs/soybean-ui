<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from 'soy-ui';
import type { ThemeColor } from 'soy-ui';

const model = ref<number[]>([33]);

const model2 = ref<number[]>([10, 60]);

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="w-480px flex flex-c-stretch gap-20px lt-sm:w-auto">
    <SSlider v-for="color in colors" :key="color" v-model="model" :max="100" :step="1" :color="color" />
  </div>
  <div class="py-12px text-18px">Orientation: Vertical</div>
  <div class="h-40">
    <SSlider v-model="model2" orientation="vertical" :max="100" :step="1" />
  </div>
</template>
