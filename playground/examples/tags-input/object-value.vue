<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput, STagsInputInput, STagsInputItem, STagsInputItemDelete, STagsInputItemText } from '@soybeanjs/ui';

interface Person {
  id: number;
  name: string;
}

const tags = ref<Person[]>([
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' }
]);
</script>

<template>
  <div>
    <h3 class="playground-title">Object Value</h3>
    <STagsInput
      v-model="tags"
      :convert-value="value => ({ id: Date.now(), name: value })"
      :display-value="value => value.name"
    >
      <template #default>
        <STagsInputItem v-for="tag in tags" :key="tag.id" :value="tag">
          <STagsInputItemText />
          <STagsInputItemDelete />
        </STagsInputItem>
        <STagsInputInput aria-label="Add person" placeholder="Add a person" />
      </template>
    </STagsInput>
  </div>
</template>
