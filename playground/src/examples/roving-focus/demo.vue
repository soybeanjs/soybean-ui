<script setup lang="ts">
import { shallowRef } from 'vue';
import { buttonVariants } from '@soybean-ui/variants';
import SectionWrapper from '../../components/section-wrapper.vue';
import ButtonGroup from './button-group.vue';
import Button from './button.vue';

const dir = shallowRef<'ltr' | 'rtl'>('ltr');

function setDir() {
  dir.value = dir.value === 'ltr' ? 'rtl' : 'ltr';
}
</script>

<template>
  <SectionWrapper title="Roving Focus">
    <div :dir="dir">
      <h1>
        Direction:
        {{ dir }}
        <button type="button" :class="buttonVariants({ variant: 'pure' })" @click="setDir">
          Toggle to
          {{ dir === 'ltr' ? 'rtl' : 'ltr' }}
        </button>
      </h1>

      <h2>no orientation (both) + no looping</h2>
      <ButtonGroup :dir="dir" default-value="two">
        <Button value="one">One</Button>
        <Button value="two">Two</Button>
        <Button disabled value="three">Three</Button>
        <Button value="four">Four</Button>
      </ButtonGroup>

      <h2>no orientation (both) + looping</h2>
      <ButtonGroup :dir="dir" loop>
        <Button value="hidden" :style="{ display: 'none' }">Hidden</Button>
        <Button value="one">One</Button>
        <Button value="two">Two</Button>
        <Button disabled value="three">Three</Button>
        <Button value="four">Four</Button>
      </ButtonGroup>

      <h2>horizontal orientation + no looping</h2>
      <ButtonGroup orientation="horizontal" :dir="dir">
        <Button value="one">One</Button>
        <Button value="two">Two</Button>
        <Button disabled value="three">Three</Button>
        <Button value="four">Four</Button>
      </ButtonGroup>

      <h2>horizontal orientation + looping</h2>
      <ButtonGroup orientation="horizontal" :dir="dir" loop>
        <Button value="one">One</Button>
        <Button value="two">Two</Button>
        <Button disabled value="three">Three</Button>
        <Button value="four">Four</Button>
      </ButtonGroup>

      <h2>vertical orientation + no looping</h2>
      <ButtonGroup orientation="vertical" :dir="dir">
        <Button value="one">One</Button>
        <Button value="two">Two</Button>
        <Button disabled value="three">Three</Button>
        <Button value="four">Four</Button>
      </ButtonGroup>

      <h2>vertical orientation + looping</h2>
      <ButtonGroup orientation="vertical" :dir="dir" loop>
        <Button value="one">One</Button>
        <Button value="two">Two</Button>
        <Button disabled value="three">Three</Button>
        <Button value="four">Four</Button>
      </ButtonGroup>
    </div>
  </SectionWrapper>
</template>
