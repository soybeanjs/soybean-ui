<script setup lang="ts">
import { ref } from 'vue';
import { SPinInput, SonnerToaster, toast } from 'soybean-ui';
import type { ThemeSize } from 'soybean-ui';

defineOptions({
  name: 'UiPinInput'
});

const numberValue = ref<string[]>([]);

const handleComplete = (value: string[]) => {
  toast.info(`the input value is ${value.join('')}`);
};

const upperCaseValue = ref<string[]>([]);

function handleChange(value: string[]) {
  upperCaseValue.value = value.join('').toUpperCase().split('');
}

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <SonnerToaster position="top-center" />
  <div class="py-12px text-18px">Default</div>
  <SPinInput v-model="numberValue" type="number" placeholder="○" @complete="handleComplete" />
  <div class="py-12px text-18px">Custom Input Count</div>
  <SPinInput :input-count="8" placeholder="○" />
  <div class="py-12px text-18px">UpperCase</div>
  <SPinInput :model-value="upperCaseValue" placeholder="○" @update:model-value="handleChange" />
  <div class="py-12px text-18px">Disabled</div>
  <SPinInput placeholder="○" disabled />
  <div class="py-12px text-18px">Separator</div>
  <SPinInput separate />
  <div class="py-12px text-18px">Custom separator</div>
  <SPinInput>
    <template #separator>-</template>
  </SPinInput>
  <div class="py-12px text-18px">Password</div>
  <SPinInput placeholder="○" type="text" mask />
  <div class="py-12px text-18px">Size</div>
  <div class="flex-col-stretch gap-3">
    <div v-for="size in sizes" :key="size">
      <div>{{ size }}</div>
      <SPinInput placeholder="○" :size="size" />
    </div>
  </div>
</template>

<style scoped></style>
