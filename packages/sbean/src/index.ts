#!/usr/bin/env node
import { Command } from 'commander';
import pkg from '../package.json' with { type: 'json' };
import { add } from './commands/add';
import { build } from './commands/build';
import { diff } from './commands/diff';
import { info } from './commands/info';
import { init } from './commands/init';
import { preset } from './commands/preset';
import { search } from './commands/search';
import { view } from './commands/view';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const program = new Command()
    .name('sbean')
    .description('add SoybeanUI components to your Vue apps')
    .version(pkg.version || '0.1.0', '-v, --version', 'display the version number');

  program
    .addCommand(init)
    .addCommand(add)
    .addCommand(build)
    .addCommand(diff)
    .addCommand(view)
    .addCommand(search)
    .addCommand(info)
    .addCommand(preset);
  await program.parseAsync();
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
