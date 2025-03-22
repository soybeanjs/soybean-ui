<script setup lang="ts">
import { SButton, SCard, SDrawer, SDrawerClose } from 'soy-ui';

defineOptions({
  name: 'UiDrawer'
});
</script>

<template>
  <SCard title="Drawer" split>
    <SDrawer title="Drawer Title" show-close content-body-class="mx-auto max-w-sm w-full">
      <template #trigger>
        <SButton variant="outline">Open</SButton>
      </template>
      <p class="pb-4">
        This is a basic drawer with a title and description.
        <br />
        For some strange reason the Vaul won't pull to close when a form i s present inside it
      </p>
      <template #footer>
        <SDrawerClose as-child>
          <SButton variant="outline">Cancel</SButton>
        </SDrawerClose>
        <SButton>Submit</SButton>
      </template>
    </SDrawer>
  </SCard>
</template>
