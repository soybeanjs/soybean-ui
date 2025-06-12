<script setup lang="ts">
import { useForwardElement } from '@headless/composables';
import { provideCollectionContext } from './context';

const { onContainerElementChange } = provideCollectionContext();

const [_, setContainerElement] = useForwardElement(onContainerElementChange);
</script>

<template>
  <ul :ref="setContainerElement">
    <slot />
  </ul>
</template>
