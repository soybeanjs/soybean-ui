<script setup lang="ts">
import { useCollectionItem } from './context';

interface Props {
  label: string;
  value: string;
}

const { label, value } = defineProps<Props>();

const { collectionItemProps } = useCollectionItem({ label, value });
</script>

<template>
  <li v-bind="collectionItemProps">
    <slot />
  </li>
</template>
