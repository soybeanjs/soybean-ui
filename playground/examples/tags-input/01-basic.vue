<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput, STagsInputInput, STagsInputItem, STagsInputItemDelete, STagsInputItemText } from '@soybeanjs/ui';

const tags = ref(['Vue', 'TypeScript']);
</script>

<template>
  <STagsInput v-model="tags">
    <template #default>
      <STagsInputItem v-for="tag in tags" :key="tag" :value="tag">
        <STagsInputItemText />
        <STagsInputItemDelete />
      </STagsInputItem>
      <STagsInputInput aria-label="Add tag" placeholder="Add a tag" />
    </template>
  </STagsInput>
</template>
