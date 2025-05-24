<script setup lang="ts">
import { COLLECTION_ITEM_ATTRIBUTE } from '../../../../src/constants';
import { useCollectionItem } from './context';

interface Props {
  label: string;
  value: string;
}

const props = defineProps<Props>();

const { setCollectionItemElement } = useCollectionItem(props);
</script>

<template>
  <li :ref="setCollectionItemElement" :[COLLECTION_ITEM_ATTRIBUTE]="true">
    <slot />
  </li>
</template>
