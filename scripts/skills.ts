/// <reference types="node" />

import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateSkillDocs } from '../.agents/skills/soybean-ui/scripts/generate';
import { runCliModule } from './_shared';

type PackageAuthor = {
  email?: string;
  name?: string;
  url?: string;
};

type PackageRepository = {
  url?: string;
};

type RootPackageManifest = {
  author?: PackageAuthor;
  description?: string;
  homepage?: string;
  license?: string;
  repository?: PackageRepository;
  version: string;
};

type DistributionPackageManifest = {
  author?: PackageAuthor;
  description: string;
  files: string[];
  homepage?: string;
  keywords: string[];
  license: string;
  name: string;
  publishConfig: {
    access: 'public';
    registry: 'https://registry.npmjs.org/';
  };
  repository?: PackageRepository;
  type: 'module';
  version: string;
};

type ClaudePluginManifest = {
  author?: Pick<PackageAuthor, 'email' | 'name'>;
  description: string;
  name: string;
};

type ClaudeMarketplaceManifest = {
  metadata: {
    description: string;
  };
  name: string;
  owner?: Pick<PackageAuthor, 'email' | 'name'>;
  plugins: Array<{
    category: 'frontend';
    description: string;
    keywords: string[];
    name: string;
    source: './';
    version: string;
  }>;
};

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '..');
const rootPackageJsonPath = path.resolve(repoRoot, 'package.json');
const skillsSourceRootDir = path.resolve(repoRoot, '.agents/skills');
const skillsDistributionRootDir = path.resolve(repoRoot, 'ui-skills');
const skillsDistributionSkillsDir = path.resolve(skillsDistributionRootDir, 'skills');
const claudePluginDir = path.resolve(skillsDistributionRootDir, '.claude-plugin');
const distributionPackageName = '@soybeanjs/ui-skills';
const distributionPluginName = 'soybean-skills';
const distributionDescription = 'Agent skills for SoybeanUI and SoybeanHeadless.';
const distributionKeywords = ['agentskills', 'soybean-ui', 'soybean-headless', 'vue', 'github-copilot', 'claude-code'];
const distributedSkillDirs = ['soybean-ui', 'soybean-headless'];

export async function generateSkillsDistribution(): Promise<void> {
  await generateSkillDocs();

  const rootPackage = await readRootPackageManifest();

  await rm(skillsDistributionRootDir, { force: true, recursive: true });
  await mkdir(skillsDistributionSkillsDir, { recursive: true });
  await mkdir(claudePluginDir, { recursive: true });

  await Promise.all(
    distributedSkillDirs.map(async skillDir => {
      await cp(path.resolve(skillsSourceRootDir, skillDir), path.resolve(skillsDistributionSkillsDir, skillDir), {
        recursive: true
      });
    })
  );

  await Promise.all([
    writeFile(path.resolve(skillsDistributionRootDir, 'README.md'), createDistributionReadme(), 'utf8'),
    writeFile(
      path.resolve(skillsDistributionRootDir, 'package.json'),
      JSON.stringify(createDistributionPackageManifest(rootPackage), null, 2) + '\n',
      'utf8'
    ),
    writeFile(
      path.resolve(claudePluginDir, 'plugin.json'),
      JSON.stringify(createClaudePluginManifest(rootPackage), null, 2) + '\n',
      'utf8'
    ),
    writeFile(
      path.resolve(claudePluginDir, 'marketplace.json'),
      JSON.stringify(createClaudeMarketplaceManifest(rootPackage), null, 2) + '\n',
      'utf8'
    )
  ]);

  console.log(`Generated skills distribution in ${path.relative(repoRoot, skillsDistributionRootDir)}.`);
}

runCliModule(import.meta.url, generateSkillsDistribution);

async function readRootPackageManifest(): Promise<RootPackageManifest> {
  const source = await readFile(rootPackageJsonPath, 'utf8');

  return JSON.parse(source) as RootPackageManifest;
}

function createDistributionPackageManifest(rootPackage: RootPackageManifest): DistributionPackageManifest {
  return {
    author: rootPackage.author,
    description: distributionDescription,
    files: ['skills', '.claude-plugin', 'README.md'],
    homepage: rootPackage.homepage,
    keywords: distributionKeywords,
    license: rootPackage.license ?? 'MIT',
    name: distributionPackageName,
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org/'
    },
    repository: rootPackage.repository,
    type: 'module',
    version: rootPackage.version
  };
}

function createClaudePluginManifest(rootPackage: RootPackageManifest): ClaudePluginManifest {
  return {
    author: rootPackage.author ? { email: rootPackage.author.email, name: rootPackage.author.name } : undefined,
    description: distributionDescription,
    name: distributionPluginName
  };
}

function createClaudeMarketplaceManifest(rootPackage: RootPackageManifest): ClaudeMarketplaceManifest {
  return {
    metadata: {
      description: distributionDescription
    },
    name: distributionPluginName,
    owner: rootPackage.author ? { email: rootPackage.author.email, name: rootPackage.author.name } : undefined,
    plugins: [
      {
        category: 'frontend',
        description: distributionDescription,
        keywords: distributionKeywords,
        name: distributionPluginName,
        source: './',
        version: rootPackage.version
      }
    ]
  };
}

function createDistributionReadme(): string {
  return [
    '# Soybean Skills',
    '',
    'Agent skills for `@soybeanjs/ui` and `@soybeanjs/headless`.',
    '',
    '## Installation',
    '',
    '```bash',
    `npx skills add ${distributionPackageName}`,
    '```',
    '',
    'The `skills` CLI installs every skill shipped in the package and places them into the correct agent-specific skills directory.',
    '',
    '## Included Skills',
    '',
    '- `soybean-ui`: Styled SoybeanUI usage, theming, docs, and component references',
    '- `soybean-headless`: Headless primitives, Compact patterns, and composition guidance',
    '',
    '## Claude Code Marketplace',
    '',
    '```bash',
    `/plugin marketplace add ${distributionPluginName}`,
    `/plugin install ${distributionPluginName}@${distributionPluginName}`,
    '```',
    '',
    '## Development',
    '',
    'Generate the publishable package contents from the source repository:',
    '',
    '```bash',
    'pnpm sui skills',
    '```',
    ''
  ].join('\n');
}
