<template>
  <SSplitterGroup class="h-40 rd-md border">
    <SSplitterPanel :default-size="40">
      <div class="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
        Fixed left panel
      </div>
    </SSplitterPanel>
    <SSplitterResizeHandle disabled aria-label="Disabled resize handle" />
    <SSplitterPanel :default-size="60">
      <div class="flex h-full items-center justify-center bg-background text-sm">Flexible right panel</div>
    </SSplitterPanel>
  </SSplitterGroup>
</template>
