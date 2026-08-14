<template>
  <SSplitterGroup direction="vertical" class="h-64 rd-md border">
    <SSplitterPanel :default-size="35">
      <div class="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">Top panel</div>
    </SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="Resize top and bottom panels" />
    <SSplitterPanel :default-size="65">
      <div class="flex h-full items-center justify-center bg-background text-sm">Bottom panel</div>
    </SSplitterPanel>
  </SSplitterGroup>
</template>
