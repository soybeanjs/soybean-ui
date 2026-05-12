#!/usr/bin/env node
import { spawn } from 'node:child_process';
import process from 'node:process';
import { version } from '../package.json';
import { generateApiLocaleTemplates } from './api-i18n';
import { translateApiLocales } from './api-i18n-translate';
import { generateApiData } from './api';
import { generateChangelogLocaleTemplates } from './changelog-i18n';
import { translateChangelogLocales } from './changelog-i18n-translate';
import { generateChangelogData } from './changelog';
import { generateHeadlessMetadata } from './headless';
import { translateHeadlessLocales } from './locale-translate';
import { generateSkillsDistribution } from './skills';
import { generateUiMetadata } from './ui';

type Command =
  | 'api'
  | 'api-locales'
  | 'api-translate'
  | 'changelog'
  | 'changelog-translate'
  | 'headless'
  | 'locale-translate'
  | 'skills'
  | 'ui';

type CommandConfig = {
  description: string;
  run: (args: string[]) => Promise<void>;
};

const isWindows = process.platform === 'win32';
const oxfmtBinary = isWindows ? 'oxfmt.cmd' : 'oxfmt';

async function formatPaths(paths: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(oxfmtBinary, paths, {
      env: process.env,
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${oxfmtBinary} ${paths.join(' ')} exited with code ${code ?? 'unknown'}.`));
    });
  });
}

const commandConfigs: Record<Command, CommandConfig> = {
  api: {
    description: 'Generate API JSON and locale templates.',
    run: async () => {
      await generateApiData();
      await generateApiLocaleTemplates();
      await formatPaths(['docs/src/generated/api/']);
    }
  },
  'api-locales': {
    description: 'Generate API locale templates only.',
    run: async () => {
      await generateApiLocaleTemplates();
    }
  },
  'api-translate': {
    description: 'Translate generated API locale files.',
    run: translateApiLocales
  },
  changelog: {
    description: 'Generate changelog JSON and locale templates.',
    run: async () => {
      await generateChangelogData();
      await generateChangelogLocaleTemplates();
      await formatPaths(['docs/src/generated/changelog/', 'docs/src/generated/changelog-locales/']);
    }
  },
  'changelog-translate': {
    description: 'Translate generated changelog locale files.',
    run: translateChangelogLocales
  },
  headless: {
    description: 'Generate headless component metadata.',
    run: async () => {
      await generateHeadlessMetadata();
      await formatPaths(['headless/src/constants/components.ts', 'headless/src/namespaced/index.ts']);
    }
  },
  'locale-translate': {
    description: 'Translate headless locale source files.',
    run: translateHeadlessLocales
  },
  skills: {
    description: 'Generate skill docs and distribution files.',
    run: async () => {
      await generateSkillsDistribution();
      await formatPaths(['ui-skills']);
    }
  },
  ui: {
    description: 'Generate UI component metadata.',
    run: async () => {
      await generateUiMetadata();
      await formatPaths(['src/constants/components.ts']);
    }
  }
};

function printHelp(): void {
  const commandHelpLines = Object.entries(commandConfigs)
    .map(([command, config]) => `  ${command.padEnd(22, ' ')}${config.description}`)
    .join('\n');

  console.log(`sui v${version}

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
    console.log(version);
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
