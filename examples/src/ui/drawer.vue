<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SDrawer, SDrawerClose } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import ThemeSizeToggler from '../components/theme-size-toggler.vue';

defineOptions({
  name: 'UiDrawer'
});

const size = ref<ThemeSize>('md');
</script>

<template>
  <SCard title="Drawer" split>
    <template #extra>
      <ThemeSizeToggler v-model:size="size" class="w-40" />
    </template>
    <SDrawer title="Drawer Title" show-close :size="size" :ui="{ contentBody: 'mx-auto max-w-sm w-full' }">
      <template #trigger>
        <SButton variant="outline">Open</SButton>
      </template>
      <p>
        This is a basic drawer with a title and description.
        <br />
        For some strange reason the Vaul won't pull to close when a form i s present inside it
      </p>
      <template #footer>
        <SDrawerClose as-child>
          <SButton :size="size" variant="outline">Cancel</SButton>
        </SDrawerClose>
        <SButton :size="size">Submit</SButton>
      </template>
    </SDrawer>
  </SCard>
</template>
