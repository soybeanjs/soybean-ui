#!/usr/bin/env node
/**
 * vbean-codemod — SoybeanUI → VBean migration codemod.
 *
 * Zero runtime dependencies. Node 18+. Dry-run by default.
 *
 * Two profiles:
 *   consumer (default) — migrate a downstream project that depends on the
 *                        published @soybeanjs/* packages.
 *   repo               — migrate this monorepo itself (adds brand copy and
 *                        internal package renames).
 *
 * See ./README.md for usage and the list of steps this script deliberately
 * does NOT automate.
 */

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Directories never traversed. */
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.nuxt',
  '.output',
  '.next',
  '.svelte-kit',
  'coverage',
  '.temp',
  '.ubean',
  '.codegraph',
  '.vite-hooks',
  '.cache',
  '.turbo',
  'vendor'
]);

/** Extensions treated as text and eligible for rewriting. */
const TEXT_EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.mts',
  '.cts',
  '.vue',
  '.svelte',
  '.astro',
  '.md',
  '.mdx',
  '.json',
  '.jsonc',
  '.json5',
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.pcss',
  '.postcss',
  '.html',
  '.htm',
  '.yaml',
  '.yml',
  '.txt',
  '.sh',
  '.bash',
  '.toml'
]);

/** Lock files are never rewritten — delete and reinstall instead. */
const ALWAYS_SKIP_FILES = new Set([
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
  'npm-shrinkwrap.json'
]);

/** Skipped only under --profile=repo: history is append-only. */
const REPO_SKIP_FILES = new Set(['CHANGELOG.md']);

const MAX_FILE_BYTES = 4 * 1024 * 1024;

/**
 * Tier A — package / import specifiers. Applied in array order.
 *
 * The `(?![-\w])` lookahead is load-bearing: without it `@soybeanjs/ui-uno`
 * would be half-rewritten into `@vbean/ui-uno`, and unrelated packages in the
 * same scope (`@soybeanjs/ui-x`, `@soybeanjs/ui-docs`, `@soybeanjs/cva`,
 * `@soybeanjs/colord`) would be mangled.
 */
const PACKAGE_RULES = [
  { id: 'pkg:headless', re: /@soybeanjs\/headless(?![\w-])/g, to: '@vbean/aria' },
  { id: 'pkg:ui-uno', re: /@soybeanjs\/ui-uno(?![\w-])/g, to: '@vbean/unocss' },
  { id: 'pkg:ui-skills', re: /@soybeanjs\/ui-skills(?![\w-])/g, to: '@vbean/skills' },
  { id: 'pkg:ui', re: /@soybeanjs\/ui(?![\w-])/g, to: '@vbean/ui' },
  { id: 'pkg:theme', re: /@soybeanjs\/theme(?![\w-])/g, to: '@vbean/theme' },
  // Nuxt `imports.transform.exclude` patterns reference the resolved dist path,
  // not the package specifier, so they survive the rules above.
  { id: 'path:aria-dist-escaped', re: /headless\\\/dist\\\//g, to: 'aria\\/dist\\/' },
  { id: 'path:aria-dist', re: /headless\/dist\//g, to: 'aria/dist/' }
];

/** Tier B — runtime contract. Opt-in: these break consumer CSS selectors. */
const RUNTIME_RULES = [
  { id: 'rt:data-attr', re: /data-soybean-/g, to: 'data-vbean-' },
  { id: 'rt:css-var', re: /--soybean-/g, to: '--vbean-' }
];

/** CLI rename. Opt-in: the `sbean` binary is a separate product surface. */
const CLI_RULES = [
  { id: 'cli:config-file', re: /\bsbean\.json\b/g, to: 'vbean.json' },
  { id: 'cli:runner', re: /\b(npx|pnpm\s+dlx|pnpm|yarn|bunx|bun)\s+sbean\b/g, to: '$1 vbean' },
  { id: 'cli:binary', re: /\bfilter\s+sbean\b/g, to: 'filter vbean' }
];

/** Tier C — brand copy and internal (private) package names. Repo profile only. */
const REPO_RULES = [
  { id: 'repo:private-pkgs', re: /@soybeanjs\/scripts(?![\w-])/g, to: '@vbean/scripts' },
  { id: 'repo:private-shared', re: /@soybeanjs\/shared(?![\w-])/g, to: '@vbean/shared' },
  { id: 'repo:private-docs', re: /@soybeanjs\/ui-docs(?![\w-])/g, to: '@vbean/docs' },
  { id: 'repo:private-nuxt', re: /@soybeanjs\/ui-nuxt(?![\w-])/g, to: '@vbean/nuxt' },
  { id: 'repo:preset-name', re: /soybean-ui-uno/g, to: 'vbean-uno' },
  { id: 'repo:logo-ui', re: /logo-soybean-ui\.svg/g, to: 'logo-vbean-ui.svg' },
  { id: 'repo:logo-aria', re: /logo-soybean-headless\.svg/g, to: 'logo-vbean-aria.svg' },
  { id: 'repo:logo-cli', re: /logo-sbean\.svg/g, to: 'logo-vbean.svg' },
  // Longest/most specific brand strings first: `SoybeanHeadless` must not be
  // left behind by the `SoybeanUI` rule (and neither touches `author.name`,
  // which is the person "Soybean", not the brand).
  { id: 'repo:brand-headless', re: /SoybeanHeadless/g, to: 'VBean Aria' },
  { id: 'repo:brand-ui', re: /SoybeanUI/g, to: 'VBean' }
];

/**
 * Tier D — hostnames. Opt-in via `--new-domain`.
 *
 * Hostnames are the one brand carrier the package rules cannot reach, and the
 * one a 301 cannot fully rescue: a stale `ui.soybeanjs.cn/r/...` registry URL
 * keeps resolving only while the old host stays up, while a stale CDN URL baked
 * into a README `<img>` or an OG meta tag is served from a hostname you no
 * longer control.
 *
 * The R2 object-path prefix (`r2.soybeanjs.tech/soybeanjs/...`) is deliberately
 * NOT rewritten: it names an object inside the bucket, and rewriting it without
 * actually copying the objects produces 404s. Attach the custom domain to the
 * existing bucket instead — see docs/rebrand-vbean.md §7.4.
 */
function buildDomainRules({ newDomain, newCdn, repoSlug }) {
  if (!newDomain) return [];

  const rules = [
    { id: 'domain:docs-registry', re: /ui\.soybeanjs\.cn/g, to: newDomain },
    { id: 'domain:cdn', re: /r2\.soybeanjs\.tech/g, to: newCdn ?? `assets.${newDomain}` }
  ];

  if (repoSlug) {
    rules.push({
      id: 'domain:repo',
      re: /github\.com\/soybeanjs\/soybean-ui(?![\w-])/g,
      to: `github.com/${repoSlug}`
    });
  }

  return rules;
}

/**
 * Manual steps this script cannot do. Printed at the end of every run.
 * Kept in sync with docs/rebrand-vbean.md §5.
 */
const MANUAL_STEPS = [
  '删除 lockfile 后重装依赖（pnpm-lock.yaml / package-lock.json 未被改写）',
  '安装新包：pnpm add @vbean/ui @vbean/aria  # 并移除 @soybeanjs/ui @soybeanjs/headless',
  'Nuxt 项目：确认 nuxt.config 中 modules 的 "@vbean/ui/nuxt" 与 imports.transform.exclude 的 /aria\\/dist\\//',
  'UnoCSS 项目：uno.config 中 preset 的导入来源改为 @vbean/unocss',
  '若在 CSS / e2e 选择器里用过 [data-soybean-*] 或 var(--soybean-*)：加 --runtime-contract 重跑，或手工替换',
  'CLI 用户：sbean.json 重命名为 vbean.json；命令 sbean → vbean',
  '自定义 registry / 镜像：registry 地址切换到新域名（旧路径 /r/* 与 /schema/* 在过渡期内保持可用）'
];

/** Printed only when `--new-domain` was passed (i.e. URLs were rewritten). */
const DOMAIN_MANUAL_STEPS = [
  'DNS + 301：旧域名（ui.soybeanjs.cn）做路径保持型 301，/r/* /schema/* /components/*.md /llms*.txt 必须逐路径保留，不能跳首页',
  'CDN：把自定义域（assets.<新域名>）绑到现有 R2 bucket；对象路径前缀 /soybeanjs/ 未被改写（改写会导致 404）',
  'SEO：新域名提交 sitemap、配置 canonical；旧域名保留至少 12 个月再下线'
];

const REPO_MANUAL_STEPS = [
  'git mv packages/headless packages/aria',
  'packages/cli（原 sbean 目录，v0.50.0 Phase A 已迁移）：改 package.json 的 name → @vbean/cli 与 bin.name → vbean',
  'pnpm sui gen catalog aria && pnpm sui gen catalog ui',
  'pnpm sui gen api && pnpm sui gen api --translate --locale zh',
  'pnpm sui gen changelog && pnpm sui gen changelog --translate',
  'packages/scripts/src/commands/catalog.ts: CatalogTarget 与 srcDir 改为 aria',
  'docs content 目录 content/{en,zh}/headless → aria；constants/menus.ts 分组值',
  '.agents/skills/soybean-ui-develop/* + AGENTS.md：层名 headless → aria',
  '上传新品牌 logo 资产到 CDN（logo-vbean-ui.svg / logo-vbean-aria.svg / logo-vbean.svg）'
];

// ---------------------------------------------------------------------------
// Rules assembly
// ---------------------------------------------------------------------------

function buildRules({ profile, runtimeContract, cli, newDomain, newCdn, repoSlug }) {
  const rules = [...PACKAGE_RULES];
  if (runtimeContract) rules.push(...RUNTIME_RULES);
  if (cli) rules.push(...CLI_RULES);
  if (profile === 'repo') rules.push(...REPO_RULES);
  rules.push(...buildDomainRules({ newDomain, newCdn, repoSlug }));
  return rules;
}
function applyRules(text, rules) {
  let out = text;
  const hits = [];

  for (const rule of rules) {
    const re = new RegExp(rule.re.source, rule.re.flags);
    let count = 0;

    out = out.replace(re, (...args) => {
      count += 1;
      return typeof rule.to === 'function' ? rule.to(...args) : rule.to;
    });

    if (count > 0) hits.push({ id: rule.id, count });
  }

  return { text: out, hits };
}

// ---------------------------------------------------------------------------
// Filesystem walk
// ---------------------------------------------------------------------------

async function collectFiles(root, { profile }) {
  const found = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const full = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        await walk(full);
        continue;
      }

      if (!entry.isFile()) continue;
      if (ALWAYS_SKIP_FILES.has(entry.name)) continue;
      if (profile === 'repo' && REPO_SKIP_FILES.has(entry.name)) continue;
      if (!TEXT_EXT.has(path.extname(entry.name).toLowerCase())) continue;

      let info;
      try {
        info = await stat(full);
      } catch {
        continue;
      }

      if (info.size === 0 || info.size > MAX_FILE_BYTES) continue;
      found.push(full);
    }
  }

  await walk(root);
  return found;
}

// ---------------------------------------------------------------------------
// Diff preview
// ---------------------------------------------------------------------------

function lineDiff(before, after, limit = 4) {
  const a = before.split('\n');
  const b = after.split('\n');
  const shown = [];
  let hidden = 0;
  const length = Math.max(a.length, b.length);

  for (let i = 0; i < length; i += 1) {
    if (a[i] === b[i]) continue;
    if (shown.length >= limit) {
      hidden += 1;
      continue;
    }
    shown.push({ line: i + 1, before: a[i] ?? '', after: b[i] ?? '' });
  }

  return { shown, hidden };
}

function truncate(value, max = 108) {
  const trimmed = value.replace(/\t/g, '  ').trimEnd();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const HELP = `vbean-codemod — SoybeanUI → VBean 迁移脚本

用法:
  node migrate.mjs [目录] [选项]

选项:
  --write                  真正写入文件（默认只预览，不写盘）
  --profile=<name>         consumer（默认）| repo
  --runtime-contract       同时改写 data-soybean-* → data-vbean-*、--soybean-* → --vbean-*
  --cli                    同时改写 sbean CLI 相关引用（sbean.json、npx sbean …）
  --new-domain=<域名>      同时改写域名引用：ui.soybeanjs.cn → <域名>、r2.soybeanjs.tech → assets.<域名>
  --new-cdn=<主机名>       覆盖 CDN 目标（默认 assets.<新域名>）
  --repo-slug=<owner/repo> 同时改写 GitHub 仓库地址 github.com/soybeanjs/soybean-ui
  --quiet                  只输出汇总，不逐文件打印 diff
  -h, --help               显示帮助

示例:
  node migrate.mjs .                                      # 预览
  node migrate.mjs . --write                              # 写入
  node migrate.mjs . --write --runtime-contract           # 写入 + 运行时契约
  node migrate.mjs . --write --cli --new-domain=vbean.dev # 写入 + CLI + 域名
  node migrate.mjs . --profile=repo --write               # 本仓库自改

退出码:
  0  成功（含"无变更"）
  1  参数错误
`;

function parseArgs(argv) {
  const options = {
    target: process.cwd(),
    write: false,
    profile: 'consumer',
    runtimeContract: false,
    cli: false,
    newDomain: null,
    newCdn: null,
    repoSlug: null,
    quiet: false,
    help: false
  };

  const positional = [];

  for (const arg of argv) {
    if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else if (arg === '--write') {
      options.write = true;
    } else if (arg === '--runtime-contract') {
      options.runtimeContract = true;
    } else if (arg === '--cli') {
      options.cli = true;
    } else if (arg === '--quiet') {
      options.quiet = true;
    } else if (arg.startsWith('--profile=')) {
      options.profile = arg.slice('--profile='.length);
    } else if (arg.startsWith('--new-domain=')) {
      options.newDomain = arg
        .slice('--new-domain='.length)
        .replace(/^https?:\/\//, '')
        .replace(/\/+$/, '');
    } else if (arg.startsWith('--new-cdn=')) {
      options.newCdn = arg
        .slice('--new-cdn='.length)
        .replace(/^https?:\/\//, '')
        .replace(/\/+$/, '');
    } else if (arg.startsWith('--repo-slug=')) {
      options.repoSlug = arg
        .slice('--repo-slug='.length)
        .replace(/^https?:\/\/github\.com\//, '')
        .replace(/\/+$/, '');
    } else if (arg.startsWith('-')) {
      throw new Error(`未知选项: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length > 1) {
    throw new Error(`只接受一个目标目录，收到: ${positional.join(', ')}`);
  }

  if (positional.length === 1) {
    options.target = path.resolve(positional[0]);
  }

  if (!['consumer', 'repo'].includes(options.profile)) {
    throw new Error(`--profile 只能是 consumer 或 repo，收到: ${options.profile}`);
  }

  for (const [flag, value] of [
    ['--new-domain', options.newDomain],
    ['--new-cdn', options.newCdn]
  ]) {
    if (value !== null && !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(value)) {
      throw new Error(`${flag} 需要纯主机名（不要带协议、路径或结尾斜杠），收到: ${value}`);
    }
  }

  if (options.repoSlug !== null && !/^[\w.-]+\/[\w.-]+$/.test(options.repoSlug)) {
    throw new Error(`--repo-slug 需要 owner/repo 形式，收到: ${options.repoSlug}`);
  }

  return options;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`\n  ✖ ${error.message}\n`);
    process.exit(1);
  }

  if (options.help) {
    console.log(HELP);
    return;
  }

  const rules = buildRules(options);
  const files = await collectFiles(options.target, options);
  const ruleTotals = new Map();
  const changed = [];

  for (const file of files) {
    let before;
    try {
      before = await readFile(file, 'utf8');
    } catch {
      continue;
    }

    if (before.includes('\u0000')) continue;

    const { text: after, hits } = applyRules(before, rules);
    if (after === before) continue;

    for (const hit of hits) {
      ruleTotals.set(hit.id, (ruleTotals.get(hit.id) ?? 0) + hit.count);
    }

    const relative = path.relative(options.target, file) || path.basename(file);
    changed.push({ file, relative, before, after, hits });

    if (options.write) {
      await writeFile(file, after, 'utf8');
    }
  }

  // ---- report ------------------------------------------------------------
  const mode = options.write ? '已写入' : '预览（未写入）';
  const domainNote = options.newDomain ? ` · domain=${options.newDomain}` : '';
  console.log(`\n  vbean-codemod · profile=${options.profile}${domainNote} · ${mode}`);
  console.log(`  扫描目录: ${options.target}`);
  console.log(`  扫描文件: ${files.length}`);

  if (changed.length === 0) {
    console.log('\n  ✓ 没有需要变更的内容（脚本是幂等的）。\n');
  } else {
    if (!options.quiet) {
      console.log('');
      for (const entry of changed) {
        console.log(`  ── ${entry.relative}  [${entry.hits.map(h => h.id).join(', ')}]`);
        const { shown, hidden } = lineDiff(entry.before, entry.after);
        for (const line of shown) {
          console.log(`     ${String(line.line).padStart(4)} - ${truncate(line.before)}`);
          console.log(`          + ${truncate(line.after)}`);
        }
        if (hidden > 0) console.log(`          … 另有 ${hidden} 处变更`);
      }
    }

    console.log(`\n  变更文件: ${changed.length}`);
    const sorted = [...ruleTotals.entries()].sort((a, b) => b[1] - a[1]);
    for (const [id, count] of sorted) {
      console.log(`    ${id.padEnd(24)} ${count}`);
    }

    if (!options.write) {
      console.log('\n  这是预览。确认无误后加 --write 落盘。');
    }
  }

  console.log('\n  仍需人工完成:');
  const steps = options.profile === 'repo' ? [...MANUAL_STEPS, ...REPO_MANUAL_STEPS] : [...MANUAL_STEPS];

  if (options.newDomain) {
    steps.push(...DOMAIN_MANUAL_STEPS);
  } else {
    steps.push(
      '域名/CDN/仓库地址未改写：如项目引用过 ui.soybeanjs.cn、r2.soybeanjs.tech 或旧仓库地址，加 --new-domain=<域名> 重跑'
    );
  }

  for (const step of steps) {
    console.log(`    · ${step}`);
  }
  console.log('');
}

main().catch(error => {
  console.error(`\n  ✖ ${error.stack ?? error.message}\n`);
  process.exit(1);
});
