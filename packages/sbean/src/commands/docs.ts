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
  const slashIndex = component.indexOf('/');

  if (component.startsWith('@') && slashIndex > 0) {
    return component.slice(slashIndex + 1);
  }

  return component;
}

function normalizeDocLinks(
  component: string,
  item: NonNullable<Awaited<ReturnType<typeof fetchRegistryItem>>>
): ComponentDocLinks {
  const slug = getComponentSlug(component);
  const registryUrl = typeof item.meta?.registryUrl === 'string' ? item.meta.registryUrl : null;
  const links: Record<string, string> = {};

  if (!component.startsWith('@')) {
    links.docs = `${DOCS_URL}/components/${slug}`;
    links.api = `${DOCS_URL}/components/${slug}`;
  }

  if (registryUrl) {
    links.registry = registryUrl.includes('{name}')
      ? registryUrl.replace('{name}', slug)
      : `${registryUrl.replace(/\/$/, '')}/${slug}.json`;
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
