/** Default SoybeanUI registry URL. */
export const REGISTRY_URL = process.env.REGISTRY_URL ?? 'https://ui.soybeanjs.cn/r';
export const DOCS_URL = process.env.DOCS_URL ?? 'https://ui.soybeanjs.cn';
export const GITHUB_SOURCE_URL = 'https://github.com/soybeanjs/soybean-ui/blob/main';

/** Path to the UI package source directory, relative to workspace root. */
export const UI_SOURCE_PATH = 'packages/ui/src';

export const DEFAULT_REGISTRY_NAMESPACE = '@soybean';

/** Built-in registry names and their URLs. */
export const BUILTIN_REGISTRIES: Record<string, string> = {
  [DEFAULT_REGISTRY_NAMESPACE]: `${REGISTRY_URL}/{name}.json`,
  '@sbean': `${REGISTRY_URL}/{name}.json`
};
