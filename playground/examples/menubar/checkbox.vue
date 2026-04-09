<script setup lang="ts">
import { ref } from 'vue';
import {
  SMenubar,
  SMenubarCheckboxGroup,
  SMenubarCheckboxItem,
  SMenubarContent,
  SMenubarMenu,
  SMenubarSeparator,
  SMenubarTrigger
} from '@soybeanjs/ui';

const columns = ref(['status-bar', 'activity-bar']);
</script>

<template>
  <div>
    <h3 class="playground-title">Checkbox</h3>
    <SMenubar>
      <SMenubarMenu value="appearance">
        <SMenubarTrigger>Appearance</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarCheckboxGroup v-model="columns">
            <SMenubarCheckboxItem value="status-bar">Status Bar</SMenubarCheckboxItem>
            <SMenubarCheckboxItem value="activity-bar">Activity Bar</SMenubarCheckboxItem>
            <SMenubarCheckboxItem value="panel">Panel</SMenubarCheckboxItem>
          </SMenubarCheckboxGroup>
          <SMenubarSeparator />
          <div class="px-2 py-1 text-xs text-muted-foreground">Selected: {{ columns.join(', ') }}</div>
        </SMenubarContent>
      </SMenubarMenu>
    </SMenubar>
  </div>
</template>
