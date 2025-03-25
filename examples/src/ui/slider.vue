<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SSlider } from 'soy-ui';
import type { ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoSlider'
});

const model = ref<number[]>([33]);

const model2 = ref<number[]>([10, 60]);

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="w-480px flex flex-c-stretch gap-6 lt-sm:w-auto">
        <SSlider v-for="color in colors" :key="color" v-model="model" :color="color" :max="100" :step="1" />
      </div>
    </SCard>
    <SCard title="Vertical" split>
      <div class="h-40">
        <SSlider v-model="model2" orientation="vertical" :max="100" :step="1" />
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="w-480px flex flex-c-stretch gap-6 lt-sm:w-auto">
        <SSlider
          v-for="(size, index) in sizes"
          :key="size"
          v-model="model"
          :color="colors[index]"
          :size="size"
          :max="100"
          :step="1"
        />
      </div>
    </SCard>
    <SCard title="Size Vertical" split>
      <div class="h-40 flex gap-6">
        <SSlider
          v-for="(size, index) in sizes"
          :key="size"
          v-model="model"
          :color="colors[index]"
          :size="size"
          orientation="vertical"
          :max="100"
          :step="1"
        />
      </div>
    </SCard>
  </div>
</template>
