<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDropdownMenuCheckbox } from '@soybeanjs/ui';
import type { MenuCheckboxOptionData } from '@soybeanjs/ui';

const modelValue = ref<string[]>(['vue', 'solid']);

const items = ref<MenuCheckboxOptionData<string>[]>([
  { isGroupLabel: true, value: 'JSFramework', label: 'JS Frameworks' },
  { value: 'vue', label: 'Vue', icon: 'logos:vue' },
  { value: 'react', label: 'React', icon: 'logos:react' },
  { value: 'angular', label: 'Angular', icon: 'logos:angular' },
  { value: 'svelte', label: 'Svelte', icon: 'logos:svelte' },
  { value: 'solid', label: 'Solid', icon: 'logos:solid' },
  { value: 'preact', label: 'Preact', icon: 'logos:preact' }
]);
</script>

<template>
  <SCard title="Checkbox">
    <SDropdownMenuCheckbox v-model="modelValue" :items="items">
      <template #trigger>
        <SButton variant="pure">Checkbox</SButton>
      </template>
    </SDropdownMenuCheckbox>
  </SCard>
</template>
