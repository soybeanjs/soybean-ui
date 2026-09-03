#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';

/**
 * `sui` — SoybeanUI repo service CLI (private, not published).
 *
 * Commands serve the repository itself: generators produce committed
 * artifacts (`apps/docs/src/generated/*`, component metadata, skills
 * distribution) and utility commands maintain workspace state. Do not merge
 * with the consumer-facing `sbean` CLI.
 *
 * ADR-008 — `sbean-schema` lives in the sbean package (closer to the valibot
 * schemas it converts) and is imported directly so `pnpm sui sbean-schema`
 * reuses the same generator as `pnpm --filter sbean build:schema`.
 */

type Command =
  | 'api'
  | 'api-locales'
  | 'api-translate'
  | 'changelog'
  | 'changelog-translate'
  | 'headless'
  | 'locale-translate'
  | 'reorder-imports'
  | 'sbean-schema'
  | 'skills'
  | 'stub'
  | 'sync-template-versions'
  | 'ui';

type CommandConfig = {
  description: string;
  run: (args: string[]) => Promise<void>;
};

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

const commandConfigs: Record<Command, CommandConfig> = {
  api: {
    description: 'Generate API JSON and locale templates.',
    run: async () => {
      const { generateApiData } = await import('./commands/api');
      const { generateApiLocaleTemplates } = await import('./commands/api-i18n');

      await generateApiData();
      await generateApiLocaleTemplates();
      await formatPaths(['apps/docs/src/generated/api/']);
    }
  },
  'api-locales': {
    description: 'Generate API locale templates only.',
    run: async () => {
      const { generateApiLocaleTemplates } = await import('./commands/api-i18n');

      await generateApiLocaleTemplates();
    }
  },
  'api-translate': {
    description: 'Translate generated API locale files.',
    run: async args => {
      const { translateApiLocales } = await import('./commands/api-i18n-translate');

      await translateApiLocales(args);
    }
  },
  changelog: {
    description: 'Generate changelog JSON and locale templates.',
    run: async () => {
      const { generateChangelogData } = await import('./commands/changelog');
      const { generateChangelogLocaleTemplates } = await import('./commands/changelog-i18n');

      await generateChangelogData();
      await generateChangelogLocaleTemplates();
      await formatPaths(['apps/docs/src/generated/changelog/', 'apps/docs/src/generated/changelog-locales/']);
    }
  },
  'changelog-translate': {
    description: 'Translate generated changelog locale files.',
    run: async args => {
      const { translateChangelogLocales } = await import('./commands/changelog-i18n-translate');

      await translateChangelogLocales(args);
    }
  },
  headless: {
    description: 'Generate headless component metadata.',
    run: async () => {
      const { generateHeadlessMetadata } = await import('./commands/headless');

      await generateHeadlessMetadata();
      await formatPaths(['packages/headless/src/constants/components.ts', 'packages/headless/src/namespaced/index.ts']);
    }
  },
  'locale-translate': {
    description: 'Translate headless locale source files.',
    run: async args => {
      const { translateHeadlessLocales } = await import('./commands/locale-translate');

      await translateHeadlessLocales(args);
    }
  },
  'reorder-imports': {
    description: 'Reorder Props before Emits in .vue import type blocks.',
    run: async args => {
      const { runReorderImports } = await import('./commands/reorder-imports');

      await runReorderImports(args);
    }
  },
  'sbean-schema': {
    description: 'Generate sbean JSON Schemas (sbean.json, registry-item.json, registry.json).',
    run: async () => {
      // ADR-008 — emits valibot→JSON-Schema into apps/docs/public/schema/.
      const { generateSchemaData } = await import('../../sbean/scripts/schema');

      await generateSchemaData('apps/docs/public/schema');
      await formatPaths(['apps/docs/public/schema/']);
    }
  },
  skills: {
    description: 'Generate skill docs and distribution files.',
    run: async () => {
      const { generateSkillsDistribution } = await import('./commands/skills');

      await generateSkillsDistribution();
      await formatPaths(['skills']);
    }
  },
  stub: {
    description: 'Switch headless development exports to src (--reset restores dist exports).',
    run: async args => {
      const { runStub } = await import('./commands/stub');

      await runStub({ reset: args.includes('--reset') });
    }
  },
  'sync-template-versions': {
    description: 'Sync the @soybeanjs/* version constant used by project templates.',
    run: async () => {
      const { runSyncTemplateVersions } = await import('./commands/sync-template-versions');

      await runSyncTemplateVersions();
    }
  },
  ui: {
    description: 'Generate UI component metadata.',
    run: async () => {
      const { generateUiMetadata } = await import('./commands/ui');

      await generateUiMetadata();
      await formatPaths(['packages/ui/src/constants/components.ts']);
    }
  }
};

function printHelp(): void {
  const commandHelpLines = Object.entries(commandConfigs)
    .map(([command, config]) => `  ${command.padEnd(24, ' ')}${config.description}`)
    .join('\n');

  console.log(`sui v${readVersion()}

SoybeanUI repo service CLI (maintainers only, never published).

Usage:
  pnpm sui <command>
  pnpm sui <command> -- [args]

Commands:
${commandHelpLines}

Options:
  -h, --help      Show this help message
  -v, --version   Show the current version
`);
}

function isHelpFlag(arg?: string): boolean {
  return arg === '--help' || arg === '-h';
}

function isVersionFlag(arg?: string): boolean {
  return arg === '--version' || arg === '-v';
}

function isCommand(value: string): value is Command {
  return value in commandConfigs;
}

async function main(): Promise<void> {
  const [firstArg, ...restArgs] = process.argv.slice(2);

  if (!firstArg || isHelpFlag(firstArg)) {
    printHelp();
    return;
  }

  if (isVersionFlag(firstArg)) {
    console.log(readVersion());
    return;
  }

  if (!isCommand(firstArg)) {
    console.error(`Unknown command: ${firstArg}`);
    console.error('');
    printHelp();
    process.exitCode = 1;
    return;
  }

  await commandConfigs[firstArg].run(restArgs);
}

await main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
