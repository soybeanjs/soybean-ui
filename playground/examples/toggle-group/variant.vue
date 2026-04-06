<script setup lang="ts">
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';
import { themeColorOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Variants</h3>
    <div class="flex flex-col items-start gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <SToggleGroup variant="soft" color="primary" default-value="preview">
          <SToggleGroupItem value="preview">Soft</SToggleGroupItem>
          <SToggleGroupItem value="code">Code</SToggleGroupItem>
          <SToggleGroupItem value="copy">Copy</SToggleGroupItem>
        </SToggleGroup>

        <SToggleGroup variant="outline" color="warning" default-value="preview">
          <SToggleGroupItem value="preview">Outline</SToggleGroupItem>
          <SToggleGroupItem value="code">Code</SToggleGroupItem>
          <SToggleGroupItem value="copy">Copy</SToggleGroupItem>
        </SToggleGroup>

        <SToggleGroup variant="ghost" color="success" default-value="preview">
          <SToggleGroupItem value="preview">Ghost</SToggleGroupItem>
          <SToggleGroupItem value="code">Code</SToggleGroupItem>
          <SToggleGroupItem value="copy">Copy</SToggleGroupItem>
        </SToggleGroup>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <SToggleGroup
          v-for="color in themeColorOptions"
          :key="color.value"
          variant="soft"
          :color="color.value"
          default-value="active"
        >
          <SToggleGroupItem value="active">{{ color.label }}</SToggleGroupItem>
          <SToggleGroupItem value="idle">Idle</SToggleGroupItem>
        </SToggleGroup>
      </div>
    </div>
  </div>
</template>
