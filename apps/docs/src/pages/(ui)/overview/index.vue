<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useLocalePrefix } from '~/composables/use-locale-prefix';

definePage({ layout: 'default' });

const router = useRouter();
const { localizedTo } = useLocalePrefix();

onBeforeMount(() => {
  router.replace(localizedTo('/overview/introduction'));
});
</script>

<template>
  <div />
</template>
