<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SAlert title="Info" description="This is an info alert" />
      <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
  </div>
</template>
