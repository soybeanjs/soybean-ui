<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STagsInput } from 'soy-ui';

defineOptions({
  name: 'DemoTagsInput'
});

const tags = ref(['Apple', 'Banana', 'Cherry']);
</script>

<template>
  <SCard title="Tags Input" split>
    <STagsInput v-model="tags" />
  </SCard>
</template>
