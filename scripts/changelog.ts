import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { kebabCase } from '@soybeanjs/utils';
import { components as headlessComponents } from '../headless/src/constants/components';
import { componentChangelogOverrides } from './changelog-overrides';

type ChangelogEntryType = 'feature' | 'fix' | 'optimization' | 'refactor' | 'docs' | 'chore' | 'style';

interface ParsedVersionBlock {
  version: string;
  compareUrl: string;
  date: string;
  entries: ParsedChangelogEntry[];
}

interface ParsedChangelogEntry {
  version: string;
  type: ChangelogEntryType;
  scope: string;
  summary: string;
  commitHash: string | null;
  commitUrl: string | null;
  authors: string[];
  source: 'exact-scope' | 'override';
}

interface GeneratedComponentChangelogEntry {
  type: ChangelogEntryType;
  scope: string;
  summary: string;
  summaryKey: string | null;
  commitHash: string | null;
  commitUrl: string | null;
  authors: string[];
  source: 'exact-scope' | 'override';
}

interface GeneratedComponentChangelogVersion {
  version: string;
  compareUrl: string;
  date: string;
  entries: GeneratedComponentChangelogEntry[];
}

interface GeneratedComponentChangelogDocument {
  component: string;
  generatedAt: string;
  schemaVersion: 1;
  versions: GeneratedComponentChangelogVersion[];
}

interface GeneratedReleaseChangelogEntry extends GeneratedComponentChangelogEntry {
  components: string[];
}

interface GeneratedReleaseChangelogVersion {
  version: string;
  compareUrl: string;
  date: string;
  entryCount: number;
  componentCount: number;
  components: string[];
  typeCounts: Partial<Record<ChangelogEntryType, number>>;
  entries: GeneratedReleaseChangelogEntry[];
}

interface GeneratedReleaseChangelogDocument {
  generatedAt: string;
  schemaVersion: 1;
  releases: GeneratedReleaseChangelogVersion[];
}

interface GeneratedComponentChangelogIndexEntry {
  component: string;
  file: string;
  latestVersion: string | null;
  versionCount: number;
  entryCount: number;
}

interface GeneratedComponentChangelogIndex {
  generatedAt: string;
  schemaVersion: 1;
  components: Record<string, GeneratedComponentChangelogIndexEntry>;
}

const rootDir = process.cwd();
const changelogPath = path.join(rootDir, 'CHANGELOG.md');
const outputDir = path.join(rootDir, 'docs/src/generated/changelog');
const componentNames = Object.keys(headlessComponents)
  .map(component => kebabCase(component))
  .sort((left, right) => left.localeCompare(right));
const componentNameSet = new Set(componentNames);

const sectionTypeMap: Record<string, ChangelogEntryType> = {
  features: 'feature',
  'bug fixes': 'fix',
  optimizations: 'optimization',
  refactors: 'refactor',
  documentation: 'docs',
  chore: 'chore',
  styles: 'style'
};
const typeRelevanceScoreMap: Record<ChangelogEntryType, number> = {
  feature: 70,
  fix: 60,
  optimization: 45,
  refactor: 35,
  docs: 15,
  chore: 10,
  style: 8
};
const sharedScopeRelevanceScoreMap: Record<string, number> = {
  components: 20,
  headless: 18,
  ui: 18,
  shared: 14,
  types: 12,
  api: 10,
  i18n: 8,
  docs: -10,
  projects: -12,
  scripts: -14,
  build: -18,
  config: -18,
  workflow: -22,
  deps: -24,
  test: -16,
  styles: -14
};

async function main() {
  const changelogContent = await readFile(changelogPath, 'utf8');
  const generatedAt = new Date().toISOString();
  const versionBlocks = parseChangelog(changelogContent);
  const documents = createComponentDocuments(versionBlocks, generatedAt);
  const releasesDocument = createReleaseDocument(versionBlocks, generatedAt);

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const index = createIndex(documents, generatedAt);

  await writeFile(path.join(outputDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
  await writeFile(path.join(outputDir, 'releases.json'), `${JSON.stringify(releasesDocument, null, 2)}\n`);

  await Promise.all(
    documents.map(document => {
      const filePath = path.join(outputDir, `${document.component}.json`);

      return writeFile(filePath, `${JSON.stringify(document, null, 2)}\n`);
    })
  );
}

function parseChangelog(content: string): ParsedVersionBlock[] {
  const lines = content.split(/\r?\n/u);
  const versions: ParsedVersionBlock[] = [];

  let currentVersion: ParsedVersionBlock | null = null;
  let currentSectionType: ChangelogEntryType | null = null;
  let currentScope: string | null = null;

  for (const line of lines) {
    const versionMatch = line.match(/^## \[(v[^\]]+)\]\(([^)]+)\) \((\d{4}-\d{2}-\d{2})\)$/u);

    if (versionMatch) {
      currentVersion = {
        version: versionMatch[1],
        compareUrl: versionMatch[2],
        date: versionMatch[3],
        entries: []
      };

      versions.push(currentVersion);
      currentSectionType = null;
      currentScope = null;
      continue;
    }

    if (!currentVersion) {
      continue;
    }

    const sectionType = getSectionType(line);

    if (sectionType) {
      currentSectionType = sectionType;
      currentScope = null;
      continue;
    }

    if (!currentSectionType) {
      continue;
    }

    const multiScopeMatch = line.match(/^- \*\*(.+?)\*\*:\s*$/u);

    if (multiScopeMatch) {
      currentScope = multiScopeMatch[1].trim();
      continue;
    }

    const singleEntryMatch = line.match(/^- \*\*(.+?)\*\*:\s+(.+)$/u);

    if (singleEntryMatch) {
      currentScope = null;

      const entry = createEntry(
        currentVersion.version,
        currentSectionType,
        singleEntryMatch[1].trim(),
        singleEntryMatch[2]
      );

      if (entry) {
        currentVersion.entries.push(entry);
      }

      continue;
    }

    const nestedEntryMatch = line.match(/^\s{2}-\s+(.+)$/u);

    if (nestedEntryMatch && currentScope) {
      const entry = createEntry(currentVersion.version, currentSectionType, currentScope, nestedEntryMatch[1]);

      if (entry) {
        currentVersion.entries.push(entry);
      }

      continue;
    }

    if (line.trim() && !line.startsWith('  ')) {
      currentScope = null;
    }
  }

  return versions;
}

function getSectionType(line: string): ChangelogEntryType | null {
  const normalizedLine = line
    .replace(/&nbsp;/gu, ' ')
    .replace(/^#+\s*/u, '')
    .replace(/[^a-zA-Z ]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
    .toLowerCase();

  return sectionTypeMap[normalizedLine] ?? null;
}

function createEntry(
  version: string,
  type: ChangelogEntryType,
  scope: string,
  lineContent: string
): ParsedChangelogEntry | null {
  const parsed = parseEntryLine(lineContent);

  if (!parsed) {
    return null;
  }

  return {
    version,
    type,
    scope,
    summary: parsed.summary,
    commitHash: parsed.commitHash,
    commitUrl: parsed.commitUrl,
    authors: parsed.authors,
    source: 'exact-scope'
  };
}

function parseEntryLine(lineContent: string) {
  const normalizedContent = lineContent.trim();
  const entryMatch = normalizedContent.match(
    /^(.*?)\s+&nbsp;-&nbsp;\s+by\s+(.*?)\s+\[<samp>\(([^)]+)\)<\/samp>\]\(([^)]+)\)$/u
  );

  if (!entryMatch) {
    return null;
  }

  return {
    summary: entryMatch[1].trim(),
    authors: parseAuthors(entryMatch[2].trim()),
    commitHash: entryMatch[3].trim(),
    commitUrl: entryMatch[4].trim()
  };
}

function parseAuthors(authorsText: string) {
  return authorsText
    .split(/,| and /u)
    .map(author => author.replace(/[*@]/gu, '').trim())
    .filter(Boolean);
}

function createComponentDocuments(versionBlocks: ParsedVersionBlock[], generatedAt: string) {
  return componentNames.map(component => {
    const versions = versionBlocks
      .map(versionBlock => {
        const entries = versionBlock.entries.flatMap(entry => mapEntryToComponent(component, entry));

        if (!entries.length) {
          return null;
        }

        return {
          version: versionBlock.version,
          compareUrl: versionBlock.compareUrl,
          date: versionBlock.date,
          entries
        } satisfies GeneratedComponentChangelogVersion;
      })
      .filter((version): version is GeneratedComponentChangelogVersion => Boolean(version));

    return {
      component,
      generatedAt,
      schemaVersion: 1,
      versions
    } satisfies GeneratedComponentChangelogDocument;
  });
}

function mapEntryToComponent(component: string, entry: ParsedChangelogEntry) {
  if (resolveEntryComponents(entry).includes(component)) {
    return [toGeneratedEntry(entry)];
  }

  return [];
}

function toGeneratedEntry(entry: ParsedChangelogEntry): GeneratedComponentChangelogEntry {
  return {
    type: entry.type,
    scope: entry.scope,
    summary: entry.summary,
    summaryKey: createSummaryKey(entry),
    commitHash: entry.commitHash,
    commitUrl: entry.commitUrl,
    authors: entry.authors,
    source: entry.source
  };
}

function createSummaryKey(entry: ParsedChangelogEntry): string | null {
  const commitHash = entry.commitHash?.trim();

  if (!commitHash) {
    return null;
  }

  return `changelog.generated.${entry.version}.${commitHash}`;
}

function createReleaseDocument(
  versionBlocks: ParsedVersionBlock[],
  generatedAt: string
): GeneratedReleaseChangelogDocument {
  return {
    generatedAt,
    schemaVersion: 1,
    releases: versionBlocks.map(versionBlock => {
      const entriesWithRelevance = versionBlock.entries
        .map((entry, index) => {
          const components = resolveEntryComponents(entry);

          return {
            index,
            components,
            relevanceScore: getReleaseEntryRelevanceScore(entry, components),
            entry: {
              ...toGeneratedEntry(entry),
              components
            } satisfies GeneratedReleaseChangelogEntry
          };
        })
        .sort((left, right) => {
          const relevanceDiff = right.relevanceScore - left.relevanceScore;

          if (relevanceDiff !== 0) {
            return relevanceDiff;
          }

          const typeDiff = typeRelevanceScoreMap[right.entry.type] - typeRelevanceScoreMap[left.entry.type];

          if (typeDiff !== 0) {
            return typeDiff;
          }

          return left.index - right.index;
        });
      const entries = entriesWithRelevance.map(item => item.entry);
      const componentScoreMap = new Map<string, number>();

      for (const item of entriesWithRelevance) {
        for (const component of item.components) {
          componentScoreMap.set(component, (componentScoreMap.get(component) ?? 0) + item.relevanceScore);
        }
      }

      const components = Array.from(componentScoreMap.entries())
        .sort((left, right) => {
          const scoreDiff = right[1] - left[1];

          if (scoreDiff !== 0) {
            return scoreDiff;
          }

          return left[0].localeCompare(right[0]);
        })
        .map(([component]) => component);
      const typeCounts = entries.reduce<Partial<Record<ChangelogEntryType, number>>>((counts, entry) => {
        counts[entry.type] = (counts[entry.type] ?? 0) + 1;

        return counts;
      }, {});

      return {
        version: versionBlock.version,
        compareUrl: versionBlock.compareUrl,
        date: versionBlock.date,
        entryCount: entries.length,
        componentCount: components.length,
        components,
        typeCounts,
        entries
      } satisfies GeneratedReleaseChangelogVersion;
    })
  };
}

function resolveEntryComponents(entry: ParsedChangelogEntry): string[] {
  if (componentNameSet.has(entry.scope)) {
    return [entry.scope];
  }

  const overrideKey = `${entry.version}:${entry.commitHash ?? ''}`;
  const overrideComponents = componentChangelogOverrides[overrideKey]?.components ?? [];

  if (!overrideComponents.length) {
    return [];
  }

  return Array.from(new Set(overrideComponents)).sort((left, right) => left.localeCompare(right));
}

function getReleaseEntryRelevanceScore(entry: ParsedChangelogEntry, components: string[]) {
  let score = typeRelevanceScoreMap[entry.type];

  if (components.length) {
    score += 100 + components.length * 8;
  }

  if (componentNameSet.has(entry.scope)) {
    score += 24;
  }

  score += sharedScopeRelevanceScoreMap[entry.scope] ?? 0;

  return score;
}

function createIndex(
  documents: GeneratedComponentChangelogDocument[],
  generatedAt: string
): GeneratedComponentChangelogIndex {
  const components = Object.fromEntries(
    documents.map(document => [
      document.component,
      {
        component: document.component,
        file: `${document.component}.json`,
        latestVersion: document.versions[0]?.version ?? null,
        versionCount: document.versions.length,
        entryCount: document.versions.reduce((total, version) => total + version.entries.length, 0)
      } satisfies GeneratedComponentChangelogIndexEntry
    ])
  ) as Record<string, GeneratedComponentChangelogIndexEntry>;

  return {
    generatedAt,
    schemaVersion: 1,
    components
  };
}

void main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
