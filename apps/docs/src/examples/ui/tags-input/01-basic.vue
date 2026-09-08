<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput } from '@soybeanjs/ui';

const tags = ref(['Vue', 'React', 'Angular']);
</script>

<template>
  <STagsInput
    v-model="tags"
    :control-props="{ 'aria-label': 'Add tag', placeholder: 'Add a tag' }"
    class="w-120 lt-md:w-full"
  />
</template>
