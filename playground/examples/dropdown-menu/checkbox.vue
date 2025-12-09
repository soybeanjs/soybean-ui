<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SDropdownMenuCheckbox } from '@soybeanjs/ui';
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
  <div>
    <h3 class="playground-title">Checkbox</h3>
    <SDropdownMenuCheckbox v-model="modelValue" :items="items">
      <template #trigger>
        <SButton variant="pure">Checkbox</SButton>
      </template>
    </SDropdownMenuCheckbox>
  </div>
</template>
