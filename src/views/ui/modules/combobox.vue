<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from 'soy-ui';
import type { CommandOptionData, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'UiCombobox'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const framework = ref('0');

const frameworks: CommandOptionData<string>[] = [
  { value: '0', label: 'Vue' },
  { value: '1', label: 'React' },
  { value: '2', label: 'Next.js' },
  { value: '3', label: 'SvelteKit' },
  { value: '4', label: 'Nuxt' },
  { value: '5', label: 'Remix' },
  { value: '6', label: 'Astro' }
];
</script>

<template>
  <div class="w-60 lt-sm:w-auto">
    <div class="py-3 text-18px">Combobox Size</div>
    <div class="flex-c-stretch gap-3">
      <div v-for="size in sizes" :key="size">
        <div>{{ size }}</div>
        <SCombobox
          v-model="framework"
          :items="frameworks"
          trigger-label="Select framework"
          empty-label="No framework found."
          :size="size"
          :input-props="{ placeholder: 'Select framework...' }"
        />
      </div>
    </div>
    <div class="py-3 text-18px">Traditional Mode</div>
    <SCombobox
      v-model="framework"
      :items="frameworks"
      mode="traditional"
      empty-label="No framework found."
      :input-props="{ placeholder: 'Select framework...' }"
    />
  </div>
</template>
