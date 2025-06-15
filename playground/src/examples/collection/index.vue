<script setup lang="ts">
import { SCard } from '@ui';
import CollectionList from './collection-list.vue';
import CollectionItem from './collection-item.vue';

const items = [
  {
    label: 'Item 1',
    value: 'item-1'
  },
  {
    label: 'Item 2',
    value: 'item-2'
  },
  {
    label: 'Item 3',
    value: 'item-3'
  }
];
</script>

<template>
  <SCard title="Collection">
    <CollectionList>
      <template v-for="item in items" :key="item.value">
        <CollectionItem v-bind="item">
          {{ item.label }}
        </CollectionItem>
      </template>
    </CollectionList>
  </SCard>
</template>
