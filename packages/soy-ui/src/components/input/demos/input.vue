<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SInput } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoInput'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const modelValue = ref<string>('');
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Size" split>
      <div class="w-320px flex-c-stretch gap-3 lt-sm:w-auto">
        <div v-for="size in sizes" :key="size">
          <div>{{ size }}</div>
          <SInput :size="size" placeholder="Please input" />
        </div>
      </div>
    </SCard>
    <SCard :title="`ModelValue : ${modelValue}`" split>
      <div class="w-320px lt-sm:w-auto">
        <SInput v-model="modelValue" placeholder="Please input" />
      </div>
    </SCard>
    <SCard title="Disabled" split>
      <div class="w-320px lt-sm:w-auto">
        <SInput model-value="the input is disabled" disabled placeholder="Please input" />
      </div>
    </SCard>
    <SCard title="File" split>
      <div class="w-320px lt-sm:w-auto">
        <SInput type="file" />
      </div>
    </SCard>
  </div>
</template>
