<script setup lang="ts">
import CallableTypeTable from './tables/callable-type-table.vue';
import { getCommonTypes } from './tables/generated-api';
import { provideTypeRenderContext } from './tables/type-anchor';

const commonTypes = computed(() => getCommonTypes());

provideTypeRenderContext({
  component: null,
  activePreviewNames: []
});
</script>

<template>
  <div class="space-y-4">
    <TypeTable :data="commonTypes.tables" />

    <CallableTypeTable
      v-for="typeItem in commonTypes.callables"
      :key="typeItem.name"
      :name="typeItem.name"
      :description="typeItem.description"
      :preset="typeItem.preset"
      :rows="typeItem.rows"
    />

    <UnionType
      v-for="typeItem in commonTypes.unions"
      :key="typeItem.name"
      :name="typeItem.name"
      :description="typeItem.description"
      :type="typeItem.type"
    />
  </div>
</template>
