<script setup lang="ts">
import { provideCollectionContext } from './context';

const { containerProps } = provideCollectionContext();
</script>

<template>
  <ul v-bind="containerProps">
    <slot />
  </ul>
</template>
