<script setup lang="ts">
import { provideCollectionContext } from './context';

const { setCollectionElement } = provideCollectionContext();
</script>

<template>
  <ul :ref="setCollectionElement">
    <slot />
  </ul>
</template>
