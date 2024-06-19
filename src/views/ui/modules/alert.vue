<script setup lang="ts">
import { ExclamationTriangleIcon, RocketIcon } from '@radix-icons/vue';
import { Alert, AlertDescription, AlertTitle } from '@su/shadcn-ui';

defineOptions({
  name: 'AlertDemo'
});
</script>

<template>
  <div class="flex-col-stretch gap-18px">
    <Alert>
      <RocketIcon class="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <ExclamationTriangleIcon class="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  </div>
</template>
