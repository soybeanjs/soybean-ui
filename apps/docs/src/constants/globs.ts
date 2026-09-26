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
  base: '../examples',
  eager: true
});

const playgroundComponentCodes = import.meta.glob<{ default: string }>('./**/*.vue', {
  base: '../examples',
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
    const match = key.match(/\.\/(?:[^/]+\/)?([^/]+)\/([^/]+)\.vue$/);
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

/**
 * 示例的展示顺序。
 *
 * 显式序号是最强信号：两个示例都带 `NN-` 前缀时按号升序，于是 `00-` 开头的示例
 * （组件自定义器）排在 `01-basic` 前面。`basic` 的置顶规则降级为**兜底**——只在
 * 序号无法裁决时生效（无前缀的 `basic.vue` 仍排在最前），这样现有的 `NN-basic`
 * 示例顺序分毫不变，`UsageCode` 也只按 `name` 取代码，与顺序无关。
 */
function comparePlaygroundExamples(a: PlaygroundExampleInfo, b: PlaygroundExampleInfo) {
  if (a.order !== null && b.order !== null && a.order !== b.order) {
    return a.order - b.order;
  }

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
  }

  return a.name.localeCompare(b.name);
}

function isIgnoredPlaygroundExample(name: string) {
  return name === 'index' || name.startsWith(ignoredPlaygroundExampleNamePrefix);
}
