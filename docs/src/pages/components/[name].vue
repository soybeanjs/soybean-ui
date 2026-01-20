<script setup lang="ts">
import { computed } from 'vue';

const router = useRouter();
const route = useRoute('/components/[name]');

const name = computed(() => route.params.name);

const path = computed(() => `components/${name.value}`);

function onLoaded(isSuccess: boolean) {
  if (isSuccess) return;
  router.replace('/404');
}
</script>

<template>
  <DocMd :path="path" @loaded="onLoaded" />
</template>
