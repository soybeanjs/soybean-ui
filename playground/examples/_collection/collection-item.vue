<script setup lang="ts">
import { useCollectionItem } from './context';

interface Props {
  label: string;
  value: string;
}

const { label, value } = defineProps<Props>();

const { setItemElement, itemProps } = useCollectionItem({ label, value });
</script>

<template>
  <li v-bind="itemProps" :ref="setItemElement">
    <slot />
  </li>
</template>
