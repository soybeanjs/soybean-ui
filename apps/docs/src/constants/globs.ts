import type { Component } from 'vue';

export interface PlaygroundExampleInfo {
  component: Component;
  code: string;
  name: string;
  order: number | null;
  rawFileName: string;
}

export type PlaygroundComponentMap = Record<string, PlaygroundExampleInfo>;

export type PlaygroundComponentExamples = Record<string, PlaygroundComponentMap>;

const playgroundExampleFileNamePattern = /^(\d{2})-(.+)$/;
const basicExampleName = 'basic';
const ignoredPlaygroundExampleNamePrefix = '_';

const playgroundComponents = import.meta.glob<{ default: Component }>('./**/*.vue', {
  base: '../../../playground/src/examples',
  eager: true
});

const playgroundComponentCodes = import.meta.glob<{ default: string }>('./**/*.vue', {
  base: '../../../playground/src/examples',
  eager: true,
  query: '?raw'
});

export const allPlaygroundComponents = getAllPlaygroundComponents();

export function getOrderedPlaygroundExamples(componentName: string): PlaygroundExampleInfo[] {
  const examples = Object.values(allPlaygroundComponents[componentName] || {});

  return [...examples].sort(comparePlaygroundExamples);
}

function getAllPlaygroundComponents() {
  const components: PlaygroundComponentExamples = {};

  for (const key in playgroundComponents) {
    const match = key.match(/\.\/([^/]+)\/([^/]+)\.vue$/);
    if (match) {
      const componentName = match[1];
      const rawFileName = match[2];

      if (!components[componentName]) {
        components[componentName] = {};
      }

      if (isIgnoredPlaygroundExample(rawFileName)) {
        continue;
      }

      const { name, order } = parsePlaygroundExampleFileName(rawFileName);

      components[componentName][name] = {
        component: playgroundComponents[key].default,
        code: playgroundComponentCodes[key]?.default || '',
        name,
        order,
        rawFileName
      };
    }
  }

  return components;
}

function parsePlaygroundExampleFileName(fileName: string) {
  const match = fileName.match(playgroundExampleFileNamePattern);

  if (!match) {
    return {
      name: fileName,
      order: null
    };
  }

  return {
    name: match[2],
    order: Number(match[1])
  };
}

function comparePlaygroundExamples(a: PlaygroundExampleInfo, b: PlaygroundExampleInfo) {
  const aIsBasic = a.name === basicExampleName;
  const bIsBasic = b.name === basicExampleName;

  if (aIsBasic !== bIsBasic) {
    return aIsBasic ? -1 : 1;
  }

  if (a.order !== null || b.order !== null) {
    if (a.order === null) {
      return 1;
    }

    if (b.order === null) {
      return -1;
    }

    if (a.order !== b.order) {
      return a.order - b.order;
    }
  }

  return a.name.localeCompare(b.name);
}

function isIgnoredPlaygroundExample(name: string) {
  return name === 'index' || name.startsWith(ignoredPlaygroundExampleNamePrefix);
}
