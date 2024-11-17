<script setup lang="ts">
import { useFocusGuards } from '../../composables';

defineOptions({
  name: 'FocusGuards'
});

useFocusGuards();
</script>

<template>
  <slot />
</template>
