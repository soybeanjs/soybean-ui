<script setup lang="ts">
import { ref } from 'vue';
import {
  SButton,
  STagsInput,
  STagsInputClear,
  STagsInputInput,
  STagsInputItem,
  STagsInputItemDelete,
  STagsInputItemText
} from '@soybeanjs/ui';

const tags = ref(['Alpha', 'Beta', 'Gamma']);
</script>

<template>
  <STagsInput v-model="tags">
    <template #default>
      <STagsInputItem v-for="tag in tags" :key="tag" :value="tag">
        <STagsInputItemText />
        <STagsInputItemDelete />
      </STagsInputItem>
      <STagsInputInput aria-label="Clearable tags input" placeholder="Add a tag" />
      <STagsInputClear as-child>
        <SButton variant="ghost" size="sm">Clear</SButton>
      </STagsInputClear>
    </template>
  </STagsInput>
</template>
