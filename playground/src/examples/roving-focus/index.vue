<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButton, SCard } from '@ui';
import ButtonGroup from './button-group.vue';
import Button from './button.vue';

const dir = shallowRef<'ltr' | 'rtl'>('ltr');

function setDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr';
}
</script>

<template>
  <SCard title="Roving Focus">
    <template #extra>
      <div class="flex items-center gap-3">
        <span>
          Direction:
          {{ dir }}
        </span>
        <SButton variant="pure" @click="setDir">
          Toggle to
          {{ dir === 'ltr' ? 'rtl' : 'ltr' }}
        </SButton>
      </div>
    </template>
    <div :dir="dir" class="flex flex-col gap-3">
      <SCard title="no orientation (both) + no looping" split>
        <ButtonGroup :dir="dir" default-value="two">
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">Three</Button>
          <Button value="four">Four</Button>
        </ButtonGroup>
      </SCard>

      <SCard title="no orientation (both) + looping" split>
        <ButtonGroup :dir="dir" loop>
          <Button value="one">One</Button>
          <Button value="hidden" :style="{ display: 'none' }">Hidden</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">Three</Button>
          <Button value="four">Four</Button>
        </ButtonGroup>
      </SCard>

      <SCard title="horizontal orientation + no looping" split>
        <ButtonGroup orientation="horizontal" :dir="dir">
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">Three</Button>
          <Button value="four">Four</Button>
        </ButtonGroup>
      </SCard>

      <SCard title="horizontal orientation + looping" split>
        <ButtonGroup orientation="horizontal" :dir="dir" loop>
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">Three</Button>
          <Button value="four">Four</Button>
        </ButtonGroup>
      </SCard>

      <SCard title="vertical orientation + no looping" split>
        <ButtonGroup orientation="vertical" :dir="dir" class="w-fit">
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">Three</Button>
          <Button value="four">Four</Button>
        </ButtonGroup>
      </SCard>

      <SCard title="vertical orientation + looping" split>
        <ButtonGroup orientation="vertical" :dir="dir" loop class="w-fit">
          <Button value="one">One</Button>
          <Button value="two">Two</Button>
          <Button disabled value="three">Three</Button>
          <Button value="four">Four</Button>
        </ButtonGroup>
      </SCard>
    </div>
  </SCard>
</template>
