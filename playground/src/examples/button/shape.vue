<script setup lang="ts">
import { Button, ButtonIcon, Card } from '@ui';

defineOptions({
  name: 'DemoButtonShape'
});
</script>

<template>
  <Card title="Shape" split>
    <div class="flex flex-wrap gap-3">
      <Button color="primary" variant="solid" shape="rounded">rounded</Button>
      <div class="flex-c-center">
        <ButtonIcon icon="lucide:minus" color="destructive" variant="plain" shape="square" />
        <div class="text-12px text-#666">square</div>
      </div>
      <div class="flex-c-center">
        <ButtonIcon icon="lucide:plus" color="success" variant="outline" shape="circle" />
        <div class="text-12px text-#666">circle</div>
      </div>
      <div class="flex-c-center">
        <ButtonIcon icon="lucide:plus" color="warning" variant="dashed" shape="square" />
        <div class="text-12px text-#666">square</div>
      </div>
      <div class="flex-c-center">
        <ButtonIcon icon="lucide:minus" shape="circle" />
        <div class="text-12px text-#666">circle</div>
      </div>
    </div>
  </Card>
</template>
