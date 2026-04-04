<script setup lang="ts">
import { SButton, useSonner } from '@soybeanjs/ui';

const sonner = useSonner();
</script>

<template>
  <div>
    <h3 class="playground-title">Type</h3>
    <div class="flex flex-wrap gap-3">
      <SButton variant="pure" @click="sonner.success('Event has been created', { description: 'Sunday, December 03, 2023' })">
        Success
      </SButton>
      <SButton variant="pure" @click="sonner.error('Something went wrong', { description: 'Please try again later.' })">
        Error
      </SButton>
      <SButton variant="pure" @click="sonner.warning('Please save your work', { description: 'Changes may be lost.' })">
        Warning
      </SButton>
      <SButton variant="pure" @click="sonner.info('New update available', { description: 'Refresh to apply the update.' })">
        Info
      </SButton>
      <SButton variant="pure" @click="sonner.loading('Uploading file...')">
        Loading
      </SButton>
    </div>
  </div>
</template>
