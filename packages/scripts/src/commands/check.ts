import process from 'node:process';
import { diffPathContents, hashPathContents } from '../shared/generation-cache';
import { runDependencyGate } from './dependency-gate';
import { generatedDataPaths, runGenAll } from './gen';

/**
 * `sui check` is the verification half of the CLI: it never publishes anything,
 * it decides whether the repository is in a releasable state and reports drift
 * with a non-zero exit code.
 */
export type CheckTarget = 'generated' | 'deps';

const checkTargets: CheckTarget[] = ['generated', 'deps'];

export function resolveCheckTargets(requested: string): CheckTarget[] {
  if (requested === 'all') {
    return checkTargets;
  }

  const target = checkTargets.find(checkTarget => checkTarget === requested);

  if (!target) {
    throw new Error(`Unknown check target: ${requested}. Expected one of: generated | deps | all.`);
  }

  return [target];
}

/**
 * Regenerate every generated surface with `--force` and compare content hashes
 * taken before and after.
 *
 * Generation is deterministic (content-aware writes plus a stable
 * `generatedAt`), so a changed file means the data on disk is not what the
 * sources produce. Comparing snapshots instead of diffing against a git
 * revision keeps the verdict independent of what happens to be committed or
 * staged, which makes the same command meaningful locally and in CI.
 */
export async function runCheckGenerated(): Promise<void> {
  const rootDir = process.cwd();

  console.log('Regenerating every generated surface to compare with the committed data...');

  const before = await hashPathContents(generatedDataPaths, rootDir);

  await runGenAll({ force: true });

  const drifted = diffPathContents(before, await hashPathContents(generatedDataPaths, rootDir));

  if (!drifted.length) {
    console.log('Generated data is in sync with the sources.');
    return;
  }

  console.error(`Generated data was out of date (${drifted.length} file${drifted.length === 1 ? '' : 's'}):`);
  drifted.forEach(file => {
    console.error(`  ${file}`);
  });
  console.error('The regenerated files are now in the working tree: review and commit them.');

  process.exitCode = 1;
}

export function runCheckDeps(): void {
  runDependencyGate();
}

export async function runCheck(requested: string): Promise<void> {
  for (const target of resolveCheckTargets(requested)) {
    if (target === 'generated') {
      await runCheckGenerated();
      continue;
    }

    runCheckDeps();
  }
}
