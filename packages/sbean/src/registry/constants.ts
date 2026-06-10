/** Default SoybeanUI registry URL. */
export const REGISTRY_URL = process.env.REGISTRY_URL ?? 'https://ui.soybeanjs.cn/r';

/** Built-in registry names and their URLs. */
export const BUILTIN_REGISTRIES: Record<string, string> = {
  '@sbean': `${REGISTRY_URL}/{name}.json`
};
