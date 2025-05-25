<script setup lang="ts">
import { provideCollectionContext } from './context';

const { collectionProps } = provideCollectionContext();
</script>

<template>
  <ul v-bind="collectionProps">
    <slot />
  </ul>
</template>
