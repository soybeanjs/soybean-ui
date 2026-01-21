import type { Component } from 'vue';

const playgroundComponents = import.meta.glob<{ default: Component }>('./**/*.vue', {
  base: '../../../playground/examples',
  eager: true
});

export function getPlaygroundComponent(component: string, file: string) {
  const key = `./${component}/${file}.vue`;

  return playgroundComponents[key]?.default || null;
}

const playgroundComponentCodes = import.meta.glob<{ default: string }>('./**/*.vue', {
  base: '../../../playground/examples',
  eager: true,
  query: '?raw'
});

export function getPlaygroundComponentCode(component: string, file: string) {
  const key = `./${component}/${file}.vue`;

  return playgroundComponentCodes[key]?.default || '';
}
