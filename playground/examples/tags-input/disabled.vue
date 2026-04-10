<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput, STagsInputInput, STagsInputItem, STagsInputItemDelete, STagsInputItemText } from '@soybeanjs/ui';

const tags = ref(['Disabled', 'Readonly']);
</script>

<template>
  <div>
    <h3 class="playground-title">Disabled</h3>
    <STagsInput v-model="tags" disabled>
      <template #default>
        <STagsInputItem v-for="tag in tags" :key="tag" :value="tag">
          <STagsInputItemText />
          <STagsInputItemDelete />
        </STagsInputItem>
        <STagsInputInput aria-label="Disabled tags input" placeholder="Disabled" />
      </template>
    </STagsInput>
  </div>
</template>
