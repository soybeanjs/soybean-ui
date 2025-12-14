<script setup lang="ts">
import TypeData, { type TypeFieldDef } from './type-data.vue';

export type TypeDataDef = {
  name: string;
  description?: string;
  fields: TypeFieldDef[];
};

interface Props {
  data?: TypeDataDef[];
}

defineProps<Props>();
</script>

<template>
  <div>
    <template v-if="data?.length">
      <TypeData v-for="item in data" :key="item.name" v-bind="item" class="mb-6" />
    </template>
    <slot v-else />
  </div>
</template>
