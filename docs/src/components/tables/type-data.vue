<script setup lang="ts">
import { computed } from 'vue';
import { toTypeAnchorId } from './type-anchor';

export type TypeFieldDef = {
  name: string;
  required?: boolean;
  type: string;
  description?: string;
};

interface Props {
  name: string;
  description?: string;
  fields: TypeFieldDef[];
}

const props = defineProps<Props>();

const anchorId = computed(() => toTypeAnchorId(props.name));
</script>

<template>
  <div>
    <h4 :id="anchorId" class="scroll-mt-24">
      {{ name }}
    </h4>
    <p v-if="description" class="text-sm text-muted-foreground">
      {{ description }}
    </p>

    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in fields" :key="field.name">
          <td>
            <div class="table-code-btn-primary">{{ field.name }}{{ field.required ? '*' : null }}</div>
          </td>
          <td>
            <div class="table-code-btn-outline">
              {{ field.type }}
            </div>
          </td>
          <td>{{ field.description || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
