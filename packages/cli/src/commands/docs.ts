import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { DOCS_URL, GITHUB_SOURCE_URL } from '../registry/constants';
import { getConfig } from '../utils/get-config';
import { fetchRegistryItem } from '../registry/fetcher';

const docsOptionsSchema = v.object({
  components: v.array(v.string()),
  cwd: v.string(),
  json: v.boolean()
});

type ComponentDocLinks = {
  component: string;
  links: Record<string, string>;
};

function getComponentSlug(component: string): string {
  const slashIndex = component.lastIndexOf('/');
  return slashIndex >= 0 ? component.slice(slashIndex + 1) : component;
}

/**
 * Docs route path for a component reference (EC-E04 / ecosystem.md §7.1).
 * Core `ui` items live under `/components`; peripheral packages under
 * `/<package>/components`. Bare and `@scope/` references default to `ui`.
 */
function getDocPath(component: string, slug: string): string {
  let pkg = 'ui';

  if (!component.startsWith('@')) {
    const slashIndex = component.indexOf('/');
    if (slashIndex > 0) {
      pkg = component.slice(0, slashIndex);
    }
  }

  return pkg === 'ui' ? `/components/${slug}` : `/${pkg}/components/${slug}`;
}

function normalizeDocLinks(
  component: string,
  item: NonNullable<Awaited<ReturnType<typeof fetchRegistryItem>>>
): ComponentDocLinks {
  const slug = getComponentSlug(component);
  // The fetched item carries the canonical namespaced name (e.g. `ui/button`),
  // which the registry URL must use regardless of how the user referenced it.
  const canonicalName = item.name;
  const registryUrl = typeof item.meta?.registryUrl === 'string' ? item.meta.registryUrl : null;
  const links: Record<string, string> = {};

  if (!component.startsWith('@')) {
    const docPath = getDocPath(component, slug);
    links.docs = `${DOCS_URL}${docPath}`;
    links.api = `${DOCS_URL}${docPath}`;
  }

  if (registryUrl) {
    links.registry = registryUrl.includes('{name}')
      ? registryUrl.replace('{name}', canonicalName)
      : `${registryUrl.replace(/\/$/, '')}/${canonicalName}.json`;
  }

  const sourceFile = item.files?.find(file => file.type === 'registry:ui') ?? item.files?.[0];

  if (sourceFile?.path) {
    links.source = `${GITHUB_SOURCE_URL}/${sourceFile.path}`;
  }

  return {
    component,
    links
  };
}

export const docs = new Command()
  .name('docs')
  .description('get docs and source links for components')
  .argument('<components...>', 'component names')
  .option('-c, --cwd <cwd>', 'the working directory', process.cwd())
  .option('--json', 'output as JSON', false)
  .action(async (components: string[], opts) => {
    const options = v.parse(docsOptionsSchema, {
      components,
      cwd: path.resolve(opts.cwd),
      json: opts.json
    });

    const config = await getConfig(options.cwd);
    const results: ComponentDocLinks[] = [];

    for (const component of options.components) {
      const item = await fetchRegistryItem(component, config);

      if (!item) {
        console.error(`Component "${component}" not found in the registry.`);
        process.exit(1);
      }

      results.push(normalizeDocLinks(component, item));
    }

    if (options.json) {
      console.log(JSON.stringify({ results }, null, 2));
      return;
    }

    console.log();

    for (const result of results) {
      console.log(`  ${result.component}`);

      for (const [key, value] of Object.entries(result.links)) {
        console.log(`  - ${key.padEnd(8)} ${value}`);
      }

      console.log();
    }
  });
