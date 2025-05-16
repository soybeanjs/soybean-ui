<script setup lang="ts">
import { SCard, SResizableHandle, SResizablePanel, SResizablePanelGroup } from 'soy-ui';
import { CircleDashed } from 'lucide-vue-next';

defineOptions({
  name: 'DemoResizable'
});
</script>

<template>
  <SCard title="Resizable" split>
    <SResizablePanelGroup id="demo-group-1" direction="horizontal" class="max-w-md border rounded-lg">
      <SResizablePanel id="demo-panel-1" :default-size="50" :min-size="20" collapsible :collapsed-size="10">
        <div class="h-[200px] flex items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </SResizablePanel>
      <SResizableHandle id="demo-handle-1" with-handle />
      <SResizablePanel id="demo-panel-2" :default-size="50" :min-size="20">
        <SResizablePanelGroup id="demo-group-2" direction="vertical">
          <SResizablePanel id="demo-panel-3" :default-size="25" :min-size="25">
            <div class="h-full flex items-center justify-center p-6">
              <span class="font-semibold">Two</span>
            </div>
          </SResizablePanel>
          <SResizableHandle id="demo-handle-2" with-handle>
            <CircleDashed />
          </SResizableHandle>
          <SResizablePanel id="demo-panel-4" :default-size="75" :min-size="25">
            <div class="h-full flex items-center justify-center p-6">
              <span class="font-semibold">Three</span>
            </div>
          </SResizablePanel>
        </SResizablePanelGroup>
      </SResizablePanel>
    </SResizablePanelGroup>
  </SCard>
</template>
