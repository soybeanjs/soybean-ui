<script setup lang="ts">
import { computed, ref } from 'vue';
import { Check, ChevronsUpDown } from 'lucide-vue-next';
import { SButton, SCommand, SPopover } from '@soybean-ui/vue';
import type { CommandItemSingleOption } from '@soybean-ui/vue';

defineOptions({
  name: 'UiCombobox'
});

const frameworks: CommandItemSingleOption<string>[] = [
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' }
];

const open = ref(false);

const selectValue = ref('');

const selectedLabel = computed(() => frameworks.find(framework => framework.value === selectValue.value)?.label);

const triggerLabel = computed(() => selectedLabel.value || 'Choose a framework');

function handleSelect(item: CommandItemSingleOption<string>) {
  selectValue.value = item.value;
  open.value = false;
}
</script>

<template>
  <SPopover v-model:open="open" content-class="w-50 p-0">
    <template #trigger>
      <SButton variant="pure" class="w-50 justify-between">
        {{ triggerLabel }}
        <template #trailing>
          <ChevronsUpDown />
        </template>
      </SButton>
    </template>
    <SCommand
      v-model="selectValue"
      :items="frameworks"
      empty-label="No framework found."
      input-class="h-8"
      @select="handleSelect"
    >
      <template #item="{ item }">
        <span>{{ item.label }}</span>
        <Check v-if="item.value === selectValue" class="ml-auto" />
      </template>
    </SCommand>
  </SPopover>
</template>

<style scoped></style>
