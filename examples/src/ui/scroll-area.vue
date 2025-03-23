<script setup lang="ts">
import { SCard, SScrollArea, SSeparator } from 'soy-ui';

defineOptions({
  name: 'DemoScrollArea'
});

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

interface Artwork {
  id: string;
  artist: string;
  art: string;
}

const works: Artwork[] = [
  {
    id: '1',
    artist: 'Ornella Binni',
    art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    artist: 'Tom Byrom',
    art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    artist: 'Vladimir Malyavko',
    art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80'
  }
];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Vertical" split>
      <SScrollArea orientation="vertical" class="h-72 w-48 border rounded-md">
        <div class="p-4">
          <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
          <div v-for="tag in tags" :key="tag">
            <div class="text-sm">{{ tag }}</div>
            <SSeparator class="my-2" />
          </div>
        </div>
      </SScrollArea>
    </SCard>
    <SCard title="Horizontal" split>
      <SScrollArea orientation="horizontal" class="w-96 whitespace-nowrap border rounded-md">
        <div class="w-max flex p-4 space-x-4">
          <div v-for="artwork in works" :key="artwork.id">
            <figure class="shrink-0">
              <div class="overflow-hidden rounded-md">
                <img
                  :src="artwork.art"
                  :alt="`Photo by ${artwork.artist}`"
                  class="aspect-[3/4] h-56 w-36 object-cover"
                />
              </div>
              <figcaption class="pt-2 text-xs text-muted-foreground">
                Photo by
                <span class="text-foreground font-semibold">
                  {{ artwork.artist }}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </SScrollArea>
    </SCard>
  </div>
</template>
