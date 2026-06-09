<template>
  <div class="relative h-72 overflow-hidden rounded-md border bg-muted/20">
    <SWatermark
      content="DRAFT"
      :font-size="24"
      font-color="rgba(255, 0, 0, 0.12)"
      font-weight="bold"
      :rotate="-15"
      :gap="[150, 120]"
      class="h-full"
    >
      <div class="flex items-center justify-center h-full">
        <p class="text-sm text-muted-foreground">Custom font size, color, weight, rotation, and gap spacing.</p>
      </div>
    </SWatermark>
  </div>
</template>
