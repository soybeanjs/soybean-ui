#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { generateCatalog } from './commands/catalog';
import type { CatalogTarget } from './commands/catalog';

/**
 * `sui` — SoybeanUI repo service CLI (private, not published).
 *
 * Commands serve the repository itself: `gen catalog|api|changelog|locale|schema|skills`
 * generate committed artifacts (`apps/docs/src/generated/*`, component metadata,
 * skills distribution) and utility commands maintain workspace state. Do not
 * merge with the consumer-facing `sbean` CLI.
 *
 * ADR-008 — schema generation lives in the sbean package (closer to the valibot
 * schemas it converts) and is imported directly so `pnpm sui gen schema` reuses
 * the same generator as `pnpm --filter sbean build:schema`.
 */

function readVersion(): string {
  const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
    version?: string;
  };

  return manifest.version ?? '0.0.0';
}

const isWindows = process.platform === 'win32';
const fmtBinary = isWindows ? 'vp.cmd' : 'vp';

async function formatPaths(paths: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(fmtBinary, ['fmt', ...paths], {
      env: process.env,
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`vp fmt ${paths.join(' ')} exited with code ${code ?? 'unknown'}.`));
    });
  });
}

function printHelp(): void {
  console.log(`sui v${readVersion()}

SoybeanUI repo service CLI (maintainers only, never published).

Usage:
  pnpm sui <command> [args]

Commands:
  gen catalog headless  Generate headless catalog: constants/components.ts + namespaced/index.ts
  gen catalog ui        Generate UI catalog: constants/components.ts
  gen api [--locales-only] [--translate --locale <locale>]
                        Extract component API JSON + locale templates
  gen changelog [--translate --locale <locale>]
                        Generate changelog JSON + locale templates
  gen locale [--locale <locale>]
                        Translate headless locale source files
  gen schema            Generate sbean JSON Schemas (sbean.json, registry-item.json, registry.json)
  gen skills            Generate skill docs and distribution files
  reorder-imports [--check] [targets...]
                        Reorder Props before Emits in .vue import type blocks
  stub [--reset]        Switch headless development exports to src (--reset restores dist exports)
  sync-template-versions
                        Sync the @soybeanjs/* version constant used by project templates

Options:
  --locales-only        (gen api) Skip extraction and only refresh locale templates
  --translate           Translate pending locale entries via DeepL (requires DEEPL_API_KEY)
  --locale <locale>     Locale to translate to
  --check               (reorder-imports) Report only; exit 1 when files drift
  -h, --help            Show this help message
  -v, --version         Show the current version
`);
}

interface GenFlags {
  localesOnly: boolean;
  translate: boolean;
  locale: string | null;
}

function parseGenFlags(args: string[]): GenFlags {
  let translate = false;
  let locale: string | null = null;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--translate') {
      translate = true;
      continue;
    }

    if (arg === '--locale') {
      locale = args[index + 1] ?? null;
      index += 1;
    }
  }

  return {
    localesOnly: args.includes('--locales-only'),
    translate,
    locale
  };
}

function translateArgs(locale: string | null): string[] {
  return locale ? ['--locale', locale] : [];
}

async function runGenApi(args: string[]): Promise<void> {
  const { localesOnly, translate, locale } = parseGenFlags(args);
  const { generateApiData } = await import('./commands/api');
  const { generateApiLocaleTemplates } = await import('./commands/api-i18n');

  if (!localesOnly) {
    await generateApiData();
  }

  await generateApiLocaleTemplates();
  await formatPaths(['apps/docs/src/generated/api/']);

  if (translate) {
    const { translateApiLocales } = await import('./commands/api-i18n-translate');

    await translateApiLocales(translateArgs(locale));
  }
}

async function runGenChangelog(args: string[]): Promise<void> {
  const { translate, locale } = parseGenFlags(args);
  const { generateChangelogData } = await import('./commands/changelog');
  const { generateChangelogLocaleTemplates } = await import('./commands/changelog-i18n');

  await generateChangelogData();
  await generateChangelogLocaleTemplates();
  await formatPaths(['apps/docs/src/generated/changelog/', 'apps/docs/src/generated/changelog-locales/']);

  if (translate) {
    const { translateChangelogLocales } = await import('./commands/changelog-i18n-translate');

    await translateChangelogLocales(translateArgs(locale));
  }
}

async function runGen(args: string[]): Promise<void> {
  const [object, ...rest] = args;

  if (!object || object === '--help' || object === '-h') {
    printHelp();
    return;
  }

  if (object === 'api') {
    await runGenApi(rest);
    return;
  }

  if (object === 'changelog') {
    await runGenChangelog(rest);
    return;
  }

  if (object === 'locale') {
    const { translateHeadlessLocales } = await import('./commands/locale-translate');

    await translateHeadlessLocales(rest);
    return;
  }

  if (object === 'schema') {
    // ADR-008 — emits valibot→JSON-Schema into apps/docs/public/schema/.
    const { generateSchemaData } = await import('../../sbean/scripts/schema');

    await generateSchemaData('apps/docs/public/schema');
    await formatPaths(['apps/docs/public/schema/']);
    return;
  }

  if (object === 'skills') {
    const { generateSkillsDistribution } = await import('./commands/skills');

    await generateSkillsDistribution();
    await formatPaths(['skills']);
    return;
  }

  if (object !== 'catalog') {
    throw new Error(`Unknown "gen" object: ${object}. Expected catalog | api | changelog | locale | schema | skills.`);
  }

  const [target] = rest;

  if (target !== 'headless' && target !== 'ui') {
    throw new Error(`gen catalog requires a target: headless | ui.`);
  }

  const outputs = await generateCatalog(target satisfies CatalogTarget);

  await formatPaths(outputs);

  outputs.forEach(output => {
    console.log(`generated ${path.relative(process.cwd(), output)}`);
  });
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === '--version' || command === '-v') {
    console.log(readVersion());
    return;
  }

  if (command === 'reorder-imports') {
    const { runReorderImports } = await import('./commands/reorder-imports');

    await runReorderImports(rest);
    return;
  }

  if (command === 'stub') {
    const { runStub } = await import('./commands/stub');

    await runStub({ reset: rest.includes('--reset') });
    return;
  }

  if (command === 'sync-template-versions') {
    const { runSyncTemplateVersions } = await import('./commands/sync-template-versions');

    await runSyncTemplateVersions();
    return;
  }

  if (command !== 'gen') {
    throw new Error(`Unknown command: ${command}. Run "pnpm sui --help" for usage.`);
  }

  await runGen(rest);
}

await main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
