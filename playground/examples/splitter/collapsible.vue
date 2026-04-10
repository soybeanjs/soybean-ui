<script setup lang="ts">
import { ref } from 'vue';

const collapsed = ref(false);
</script>

<template>
  <div>
    <h3 class="playground-title">Collapsible</h3>
    <div class="flex-c gap-3">
      <div class="flex items-center gap-2">
        <button class="rd-md border px-3 py-1.5 text-sm" @click="collapsed = !collapsed">
          {{ collapsed ? 'Expand sidebar' : 'Collapse sidebar' }}
        </button>
      </div>
      <div class="h-48 rd-md border">
        <SSplitterGroup>
          <SSplitterPanel v-slot="{ expand, collapse }" collapsible :collapsed-size="0" :min-size="20" :default-size="30">
            <div class="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
              <button class="rd-md border px-3 py-1.5" @click="collapsed ? expand() : collapse()">
                {{ collapsed ? 'Expand from panel' : 'Collapse from panel' }}
              </button>
            </div>
          </SSplitterPanel>
          <SSplitterResizeHandle with-handle aria-label="Resize sidebar and preview panels" @dragging="collapsed = false" />
          <SSplitterPanel>
            <div class="flex h-full items-center justify-center bg-background text-sm">Preview</div>
          </SSplitterPanel>
        </SSplitterGroup>
      </div>
    </div>
  </div>
</template>
