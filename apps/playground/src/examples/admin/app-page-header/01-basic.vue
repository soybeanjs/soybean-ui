<script setup lang="ts">
import { SAppPageHeader } from '@soybeanjs/admin';
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-md border border-solid border-border">
      <SAppPageHeader title="Dashboard" description="A runnable admin shell built with @soybeanjs/admin" show-back>
        <SButton color="primary" icon="lucide:plus">New</SButton>
      </SAppPageHeader>
    </div>
    <div class="rounded-md border border-solid border-border">
      <SAppPageHeader title="Settings" description="Configure your workspace preferences" />
    </div>
  </div>
</template>
