<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SEmpty class="min-h-72" title="No projects yet" description="Create your first project to start organizing work.">
      <SButton>Create project</SButton>
    </SEmpty>
  </div>
</template>
