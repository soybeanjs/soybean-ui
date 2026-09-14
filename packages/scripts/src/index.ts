#!/usr/bin/env node
import process from 'node:process';
import { createCli } from './cli';

/**
 * Entry point: run the declared command that matches `process.argv`.
 *
 * Parsing happens with `run: false` so the matched action can be awaited and
 * its rejection reported as a plain message instead of an unhandled rejection.
 */
async function main(): Promise<void> {
  const cli = createCli();
  const parsed = cli.parse(process.argv, { run: false });

  if (!cli.matchedCommand) {
    // `--help` and `--version` already printed through cac.
    if (parsed.options.help || parsed.options.version) {
      return;
    }

    if (cli.args.length) {
      console.error(`Unknown command: ${cli.args.join(' ')}`);
      cli.outputHelp();
      process.exitCode = 1;
      return;
    }

    cli.outputHelp();
    return;
  }

  await cli.runMatchedCommand();
}

await main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
