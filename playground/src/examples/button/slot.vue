<script setup lang="ts">
import { Button, Card, Icon } from '@ui';

defineOptions({
  name: 'DemoButtonSlot'
});
</script>

<template>
  <Card title="Slot" split>
    <div class="flex flex-wrap gap-12px">
      <Button color="primary">
        <template #leading>
          <Icon icon="lucide:plus" />
        </template>
        leading
      </Button>
      <Button color="destructive" variant="outline">
        After
        <template #trailing>
          <Icon icon="lucide:minus" />
        </template>
      </Button>
      <Button color="success" variant="dashed">
        <template #leading>
          <Icon icon="lucide:plus" />
        </template>
        Both
        <template #trailing>
          <Icon icon="lucide:minus" />
        </template>
      </Button>
    </div>
  </Card>
</template>
