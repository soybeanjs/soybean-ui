import type { Component } from 'vue';

const playgroundComponents = import.meta.glob<{ default: Component }>('./**/*.vue', {
  base: '../../../playground/examples',
  eager: true
});

const playgroundComponentCodes = import.meta.glob<{ default: string }>('./**/*.vue', {
  base: '../../../playground/examples',
  eager: true,
  query: '?raw'
});

export const allPlaygroundComponents = getAllPlaygroundComponents();

function getAllPlaygroundComponents() {
  const components: Record<
    string,
    Record<
      string,
      {
        component: Component;
        code: string;
      }
    >
  > = {};

  for (const key in playgroundComponents) {
    const match = key.match(/\.\/([^/]+)\/([^/]+)\.vue$/);
    if (match) {
      const componentName = match[1];
      const fileName = match[2];
      if (!components[componentName]) {
        components[componentName] = {};
      }

      if (fileName !== 'index') {
        components[componentName][fileName] = {
          component: playgroundComponents[key].default,
          code: playgroundComponentCodes[key]?.default || ''
        };
      }
    }
  }

  return components;
}
