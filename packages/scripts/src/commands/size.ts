import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { readJsonObject } from '../shared/json';
import {
  collectExternalSpecifiers,
  evaluateSizeCheck,
  extractBaseline,
  isBaselineComparable,
  parseSizeBudget,
  renderConsoleReport,
  renderMarkdownReport,
  summarizeVerdicts
} from '../shared/size';
import type {
  SizeBudgetFile,
  SizeCheck,
  SizeEngineFingerprint,
  SizeMeasurement,
  SizeMetrics,
  SizeReport,
  WorkspacePackageManifest
} from '../shared/size';
import {
  discoverWorkspacePackages,
  measureBundleMetrics,
  measureFileMetrics,
  measurePackMetrics,
  readEsbuildVersion,
  readGitCommit
} from '../shared/size-measure';

/**
 * `sui size` measures what the library costs to ship and to import, and
 * `sui check size` turns the same measurement into a gate.
 *
 * Layering: `shared/size.ts` holds the pure rules, `shared/size-measure.ts`
 * holds the I/O, and this module only wires them together and decides the exit
 * code. The measurement is deterministic — byte-identical rebuilds produce
 * identical numbers — so a report written by a main-branch run can serve as the
 * baseline for a pull request without building the base branch again.
 */
export interface SizeRunOptions {
  baselinePath?: string;
  budgetPath?: string;
  /** Fail with a non-zero exit code when a gated check has a fail verdict. */
  check?: boolean;
  reportDir?: string;
  write?: boolean;
}

const defaultBudgetPath = 'size-budget.json';
const defaultBaselinePath = '.size-cache/size-baseline.json';
const defaultReportDir = '.size-report';

const resolvedOptions = (options: SizeRunOptions): Required<SizeRunOptions> => ({
  baselinePath: options.baselinePath ?? defaultBaselinePath,
  budgetPath: options.budgetPath ?? defaultBudgetPath,
  check: Boolean(options.check),
  reportDir: options.reportDir ?? defaultReportDir,
  write: options.write ?? true
});

const measureCheck = async (options: {
  cacheDir: string;
  check: SizeCheck;
  engine: SizeEngineFingerprint;
  manifests: readonly WorkspacePackageManifest[];
  rootDir: string;
}): Promise<SizeMeasurement> => {
  const { check, rootDir } = options;
  const base = { budget: check.budget, gate: check.gate, id: check.id, kind: check.kind };

  if (check.kind === 'file') {
    return { ...base, metrics: measureFileMetrics(path.resolve(rootDir, check.path)) };
  }

  if (check.kind === 'pack') {
    return {
      ...base,
      metrics: await measurePackMetrics({
        cacheDir: options.cacheDir,
        packageDir: path.resolve(rootDir, check.packageDir)
      })
    };
  }

  return {
    ...base,
    metrics: await measureBundleMetrics({
      entryPath: path.resolve(rootDir, check.entry),
      external: collectExternalSpecifiers({
        engineExternal: options.engine.external,
        manifests: options.manifests,
        policy: check.deps
      }),
      importClause: check.import,
      manifests: options.manifests,
      rootDir
    })
  };
};

const artifactPathsOf = (check: SizeCheck, rootDir: string): string[] => {
  if (check.kind === 'file') {
    return [path.resolve(rootDir, check.path)];
  }

  if (check.kind === 'pack') {
    return [path.resolve(rootDir, check.packageDir)];
  }

  return [path.resolve(rootDir, check.entry)];
};

const assertArtifactsExist = (checks: readonly SizeCheck[], rootDir: string): void => {
  const missing = checks.flatMap(check => artifactPathsOf(check, rootDir)).filter(artifact => !existsSync(artifact));

  if (missing.length === 0) {
    return;
  }

  throw new Error(
    `size checks need build output that is missing:\n${missing
      .map(artifact => `  ${path.relative(rootDir, artifact)}`)
      .join('\n')}\nRun \`pnpm build\` first.`
  );
};

const readBaseline = (
  baselinePath: string
): { checks: Map<string, SizeMetrics>; engine: Partial<SizeEngineFingerprint>; generatedAt: string | null } | null => {
  if (!existsSync(baselinePath)) {
    return null;
  }

  try {
    return extractBaseline(JSON.parse(readFileSync(baselinePath, 'utf8')));
  } catch {
    return null;
  }
};

/** Parse errors are re-thrown with the file name, so a hand-edited budget is easy to locate. */
const readBudget = async (budgetPath: string, rootDir: string): Promise<SizeBudgetFile> => {
  const relative = path.relative(rootDir, budgetPath);
  const label = relative.startsWith('..') ? budgetPath : relative;

  try {
    return parseSizeBudget(await readJsonObject(budgetPath));
  } catch (error) {
    throw new Error(`${label}: ${error instanceof Error ? error.message : String(error)}`, { cause: error });
  }
};

const writeReportFiles = (options: {
  json: string;
  markdown: string;
  reportDir: string;
}): { jsonPath: string; markdownPath: string } => {
  mkdirSync(options.reportDir, { recursive: true });

  const jsonPath = path.join(options.reportDir, 'size-report.json');
  const markdownPath = path.join(options.reportDir, 'size-report.md');

  writeFileSync(jsonPath, `${options.json}\n`, 'utf8');
  writeFileSync(markdownPath, options.markdown, 'utf8');

  return { jsonPath, markdownPath };
};

const appendStepSummary = (markdown: string): string | null => {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (!summaryPath) {
    return null;
  }

  appendFileSync(summaryPath, markdown, 'utf8');

  return summaryPath;
};

const reportGateFailure = (report: SizeReport): void => {
  const failing = report.checks.filter(verdict => verdict.status === 'fail');

  console.error(`\nsize gate failed: ${failing.length} check(s) over budget or over the delta threshold\n`);
  failing.forEach(verdict => {
    console.error(`  ❌ ${verdict.id}`);
    verdict.notes.forEach(note => console.error(`     ${note}`));
  });

  process.exitCode = 1;
};

export async function runSize(options: SizeRunOptions = {}): Promise<void> {
  const settings = resolvedOptions(options);
  const rootDir = process.cwd();
  const budgetPath = path.resolve(rootDir, settings.budgetPath);
  const baselinePath = path.resolve(rootDir, settings.baselinePath);
  const reportDir = path.resolve(rootDir, settings.reportDir);
  const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'sui');

  if (!existsSync(budgetPath)) {
    throw new Error(`size budget not found: ${path.relative(rootDir, budgetPath)}`);
  }

  const budget = await readBudget(budgetPath, rootDir);
  assertArtifactsExist(budget.checks, rootDir);

  const engine: SizeEngineFingerprint = {
    bundler: budget.engine.bundler,
    external: budget.engine.external,
    version: budget.engine.version || readEsbuildVersion()
  };
  const manifests = discoverWorkspacePackages(rootDir);

  console.log(`Measuring ${budget.checks.length} size check(s) with ${engine.bundler} ${engine.version}...`);

  const measurements: SizeMeasurement[] = [];

  for (const check of budget.checks) {
    measurements.push(await measureCheck({ cacheDir, check, engine, manifests, rootDir }));
  }

  const baseline = readBaseline(baselinePath);
  const compareBaseline = baseline !== null && isBaselineComparable({ baselineEngine: baseline.engine, engine });
  const verdicts = measurements.map(measurement =>
    evaluateSizeCheck({
      baseline: baseline?.checks.get(measurement.id) ?? null,
      compareBaseline,
      measurement,
      thresholds: budget.delta
    })
  );
  const report: SizeReport = {
    baseline: baseline
      ? {
          comparable: compareBaseline,
          generatedAt: baseline.generatedAt,
          path: path.relative(rootDir, baselinePath)
        }
      : null,
    checks: verdicts,
    commit: await readGitCommit(rootDir),
    delta: budget.delta,
    engine,
    generatedAt: new Date().toISOString(),
    node: process.version,
    summary: summarizeVerdicts(verdicts)
  };
  const markdown = renderMarkdownReport(report);

  console.log(`\n${renderConsoleReport(report)}\n`);
  console.log(
    report.baseline
      ? `baseline: ${report.baseline.path}${report.baseline.comparable ? '' : ' (engine differs — deltas are informational)'}`
      : `baseline: none at ${path.relative(rootDir, baselinePath)} — budgets only`
  );

  if (settings.write) {
    const files = writeReportFiles({ json: JSON.stringify(report, null, 2), markdown, reportDir });

    console.log(`report: ${path.relative(rootDir, files.markdownPath)} · ${path.relative(rootDir, files.jsonPath)}`);
  }

  const summaryPath = appendStepSummary(markdown);

  if (summaryPath) {
    console.log(`step summary: ${summaryPath}`);
  }

  const { fail, ok, skip, warn } = report.summary;

  console.log(`checks: ${ok} ok, ${warn} warn, ${fail} fail, ${skip} skip`);

  if (settings.check && fail > 0) {
    reportGateFailure(report);
  }
}

export async function runCheckSize(): Promise<void> {
  await runSize({ check: true });
}
