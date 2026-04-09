<script setup lang="ts">
import { ref } from 'vue';
import {
  SMenubar,
  SMenubarContent,
  SMenubarMenu,
  SMenubarRadioGroup,
  SMenubarRadioItem,
  SMenubarSeparator,
  SMenubarTrigger
} from '@soybeanjs/ui';

const theme = ref('system');
</script>

<template>
  <div>
    <h3 class="playground-title">Radio</h3>
    <SMenubar>
      <SMenubarMenu value="theme">
        <SMenubarTrigger>Theme</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarRadioGroup v-model="theme">
            <SMenubarRadioItem value="light">Light</SMenubarRadioItem>
            <SMenubarRadioItem value="dark">Dark</SMenubarRadioItem>
            <SMenubarRadioItem value="system">System</SMenubarRadioItem>
          </SMenubarRadioGroup>
          <SMenubarSeparator />
          <div class="px-2 py-1 text-xs text-muted-foreground">Current: {{ theme }}</div>
        </SMenubarContent>
      </SMenubarMenu>
    </SMenubar>
  </div>
</template>
