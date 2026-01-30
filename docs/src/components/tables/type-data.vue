<script setup lang="ts">
import { toTypeAnchorId, typeToVNode } from './type-anchor';

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
    <h4 :id="anchorId" class="text-lg font-semibold my-3 scroll-mt-24">
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
            <div class="code-btn">
              <span>{{ field.name }}</span>
              <span v-if="field.required" class="ml-1 text-destructive/80">*</span>
            </div>
          </td>
          <td>
            <div class="code-btn-outline">
              <component :is="typeToVNode(field.type)" />
            </div>
          </td>
          <td>{{ field.description || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
