<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SSlider } from 'soy-ui';
import type { ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoSlider'
});

const model = ref<number[]>([33]);

const model2 = ref<number[]>([10, 60]);

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="w-480px flex flex-c-stretch gap-20px lt-sm:w-auto">
        <SSlider v-for="color in colors" :key="color" v-model="model" :max="100" :step="1" :color="color" />
      </div>
    </SCard>
    <SCard title="Orientation: Vertical" split>
      <div class="h-40">
        <SSlider v-model="model2" orientation="vertical" :max="100" :step="1" />
      </div>
    </SCard>
  </div>
</template>
