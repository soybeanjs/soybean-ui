<script setup lang="ts">
import { ref } from 'vue';
import type { TextareaSize } from 'soybean-ui';
import { STextarea } from 'soybean-ui';

defineOptions({
  name: 'UiTextarea'
});

const sizes: TextareaSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const defaultModelValue = ref<string>('Default value');
const modelValue = ref<string>('');
</script>

<template>
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Textarea Size</div>
    <div class="flex-col-stretch gap-3">
      <div v-for="size in sizes" :key="size">
        <div>{{ size }}</div>
        <STextarea :size="size" placeholder="Please Textarea" />
      </div>
    </div>
    <div class="py-12px text-18px">Default value : {{ defaultModelValue }}</div>
    <STextarea v-model="defaultModelValue" placeholder="Please Textarea" />
    <div class="py-12px text-18px">Textarea modelValue : {{ modelValue }}</div>
    <STextarea v-model="modelValue" placeholder="Please Textarea" />
    <div class="py-12px text-18px">Textarea Disabled</div>
    <STextarea model-value="the Textarea is disabled" disabled placeholder="Please Textarea" />
    <div class="py-12px text-18px">Textarea Resize</div>
    <div class="flex flex-col gap-6">
      <STextarea model-value="Resize None" class="resize-none" />
      <STextarea model-value="Resize Y" class="resize-y" />
      <STextarea model-value="Resize X" class="resize-x" />
      <STextarea model-value="Resize Both" class="resize" />
    </div>
  </div>
</template>
