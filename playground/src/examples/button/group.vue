<script setup lang="ts">
import { Button, ButtonGroup, Card } from '@ui';
</script>

<template>
  <Card title="Button Group" split>
    <ButtonGroup variant="pure" color="accent">
      <Button v-for="i in 5" :key="i">Button {{ i }}</Button>
    </ButtonGroup>
  </Card>
  <Card title="Button Group Vertical" split>
    <ButtonGroup orientation="vertical" class="w-30" variant="outline" color="warning">
      <Button v-for="i in 10" :key="i">Button {{ i }}</Button>
    </ButtonGroup>
  </Card>
</template>
