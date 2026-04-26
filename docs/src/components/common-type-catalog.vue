<script setup lang="ts">
import { getCommonTypes } from './tables/generated-api';

const commonTypes = computed(() => getCommonTypes());
</script>

<template>
  <div class="space-y-4">
    <TypeTable :data="commonTypes.tables" />

    <UnionType
      v-for="typeItem in commonTypes.unions"
      :key="typeItem.name"
      :name="typeItem.name"
      :description="typeItem.description"
      :type="typeItem.type"
    />
  </div>
</template>
