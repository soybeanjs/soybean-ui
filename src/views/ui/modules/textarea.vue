<script setup lang="ts">
import { ref } from 'vue';
import { STextarea } from 'soybean-ui';
import type { TextareaSize } from 'soybean-ui';

defineOptions({
  name: 'UiTextarea'
});

const sizes: TextareaSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const modelValue = ref<string>('');

const rows: number[] = [1, 2, 3, 4];
</script>

<template>
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Size</div>
    <div class="flex-col-stretch gap-3">
      <STextarea
        v-for="size in sizes"
        :key="size"
        :default-value="`size: ${size}`"
        :size="size"
        placeholder="Please Input Textarea"
      />
    </div>
    <div class="py-12px text-18px">Rows</div>
    <div class="flex-col-stretch gap-3">
      <STextarea
        v-for="row in rows"
        :key="row"
        :default-value="`rows: ${row}`"
        :rows="row"
        placeholder="Please Input Textarea"
      />
    </div>
    <div class="py-12px text-18px">Default value</div>
    <STextarea default-value="defaultModelValue" placeholder="Please Input Textarea" />
    <div class="py-12px text-18px">v-model : {{ modelValue }}</div>
    <STextarea v-model="modelValue" placeholder="Please Input Textarea" />
    <div class="py-12px text-18px">Disabled</div>
    <STextarea model-value="the Textarea is disabled" disabled placeholder="Please Input Textarea" />
    <div class="py-12px text-18px">Resize</div>
    <div class="flex flex-col gap-6">
      <STextarea model-value="Resize None" :resize="false" />
      <STextarea model-value="Resize Vertical" resize="vertical" />
      <STextarea model-value="Resize Horizontal" resize="horizontal" />
      <STextarea model-value="Resize Both" resize />
    </div>
  </div>
</template>
