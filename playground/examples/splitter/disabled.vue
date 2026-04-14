<template>
  <div>
    <h3 class="playground-title">Disabled Handle</h3>
    <div class="h-40 rd-md border">
      <SSplitterGroup>
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
    </div>
  </div>
</template>
