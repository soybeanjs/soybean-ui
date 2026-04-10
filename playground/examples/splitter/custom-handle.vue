<template>
  <div>
    <h3 class="playground-title">Custom Handle</h3>
    <div class="h-40 rd-md border">
      <SSplitterGroup>
        <SSplitterPanel :default-size="45">
          <div class="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">Inspector</div>
        </SSplitterPanel>
        <SSplitterResizeHandle aria-label="Resize inspector and editor panels">
          <div class="bg-background z-10 flex h-5 w-5 items-center justify-center rounded-full border border-border shadow-sm">
            <span class="i-lucide-grip-vertical text-xs text-muted-foreground" aria-hidden="true" />
          </div>
        </SSplitterResizeHandle>
        <SSplitterPanel :default-size="55">
          <div class="flex h-full items-center justify-center bg-background text-sm">Editor</div>
        </SSplitterPanel>
      </SSplitterGroup>
    </div>
  </div>
</template>
