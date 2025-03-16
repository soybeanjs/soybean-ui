<script setup lang="ts">
import { SCombobox } from 'soy-ui';
import type { CommandOptionData, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'UiCombobox'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const frameworks: CommandOptionData<string>[] = [
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' }
];
</script>

<template>
  <div class="w-60 lt-sm:w-auto">
    <div class="py-3 text-18px">Combobox Size</div>
    <div class="flex-c-stretch gap-3">
      <div v-for="size in sizes" :key="size">
        <div>{{ size }}</div>
        <SCombobox
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
      :items="frameworks"
      mode="traditional"
      empty-label="No framework found."
      :input-props="{ placeholder: 'Select framework...' }"
    />
  </div>
</template>
