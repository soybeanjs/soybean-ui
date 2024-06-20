<script setup lang="ts">
import { ChevronRightIcon, EnvelopeOpenIcon, ReloadIcon } from '@radix-icons/vue';
import { Button } from '@su/shadcn-ui';

defineOptions({
  name: 'ButtonDemo'
});
</script>

<template>
  <div class="flex flex-wrap gap-12px">
    <Button>Button</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="outline" size="icon">
      <ChevronRightIcon class="h-4 w-4" />
    </Button>
    <Button>
      <EnvelopeOpenIcon class="mr-2 h-4 w-4" />
      Login with Email
    </Button>
    <Button disabled>
      <ReloadIcon class="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
    <Button as-child>
      <a>Login</a>
    </Button>
  </div>
</template>
