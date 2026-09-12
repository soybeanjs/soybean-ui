#!/usr/bin/env node
/**
 * vbean-codemod · components — rename the styled-layer component prefix.
 *
 * Zero runtime dependencies. Node 18+. Dry-run by default.
 *
 * @vbean/ui exports components with an `S` prefix (SButton, SDialog, …) while
 * @vbean/aria exports the same primitives unprefixed (Button, Dialog, …). The
 * prefix is what keeps the two layers apart in one file:
 *
 *   import { Button } from '@vbean/aria'   // unstyled behaviour
 *   import { SButton } from '@vbean/ui'    // styled wrapper
 *
 * So the question is never "prefix or no prefix" — it is "which letter".
 * This script swaps the letter across sources, templates, component `name`
 * options and string references, using an exact allow-list.
 *
 * ---------------------------------------------------------------------------
 * WHY AN ALLOW-LIST AND NOT A REGEX
 * ---------------------------------------------------------------------------
 * `\bS[A-Z]\w*\b` looks like it would work and is catastrophic. Real examples
 * found in this repo:
 *
 *   SCSS            → VCSS              SIGTERM     → VIGTERM
 *   SDK             → VDK               SEO         → VEO
 *   ScrollAreaRoot  → VcrollAreaRoot    SelectArrow → VelectArrow
 *   SeparatorRoot   → VeparatorRoot     SwitchRoot  → WitchRoot
 *
 * Every one of those is a genuine identifier. Only the 144 names actually
 * exported by @vbean/ui may be rewritten, so that is what this script matches.
 *
 * kebab-case is guarded too: it is rewritten ONLY inside tag position
 * (`<s-button>` / `</s-button>`), never globally — `border-s` and
 * `rounded-s-md` are Tailwind logical-property shorthands, not components.
 *
 * ---------------------------------------------------------------------------
 * REGENERATING THE ALLOW-LIST
 * ---------------------------------------------------------------------------
 * Run against the built package so the list reflects the real public surface:
 *
 *   rg -o --no-filename 'as (S[A-Za-z0-9]+)' packages/ui/dist -g '*.d.ts' \
 *     | sed 's/^as //' | sort -u
 *
 * (This was cross-checked against packages/ui/src/components/<name>/index.ts
 * and both produced the same 144 names.)
 *
 * See ./README.md for usage and for steps this script deliberately skips.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Directories never traversed. Mirrors migrate.mjs. */
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

/** Source files always eligible for rewriting. */
const CODE_EXT = new Set([
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
  '.html',
  '.htm'
]);

/** Extra extensions pulled in by --docs. */
const DOC_EXT = new Set(['.md', '.mdx']);

/** Lock files are never rewritten — delete and reinstall instead. */
const ALWAYS_SKIP_FILES = new Set([
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
  'npm-shrinkwrap.json'
]);

/**
 * Files that record the past and must not be rewritten, even with --docs.
 * Renaming history makes it lie. Override with --include-history.
 */
const HISTORY_PATTERNS = [/(^|\/)CHANGELOG\.md$/i, /(^|\/)migration(\/|$)/i, /(^|\/)rebrand-vbean\.md$/i];

const MAX_FILE_BYTES = 4 * 1024 * 1024;

/**
 * The 141 components exported by @vbean/ui.
 * Extracted from packages/ui/dist/**\/*.d.ts (`… as SButton`), cross-checked
 * against packages/ui/src/components/<name>/index.ts.
 *
 * @type {readonly string[]}
 */
const S_EXPORTS = [
  'SAccordion',
  'SAffix',
  'SAlert',
  'SAnchor',
  'SAspectRatio',
  'SAutocomplete',
  'SAvatar',
  'SBacktop',
  'SBadge',
  'SBottomSheet',
  'SBreadcrumb',
  'SBreadcrumbEllipsis',
  'SBreadcrumbPage',
  'SButton',
  'SButtonGroup',
  'SButtonIcon',
  'SButtonLink',
  'SButtonLoading',
  'SCalendar',
  'SCalendarRange',
  'SCard',
  'SCardCollapsibleTrigger',
  'SCarousel',
  'SCascader',
  'SCheckbox',
  'SCheckboxCard',
  'SCheckboxCardGroup',
  'SCheckboxGroup',
  'SClipboard',
  'SCollapsible',
  'SCollapsibleContent',
  'SCollapsibleTrigger',
  'SColorArea',
  'SColorField',
  'SColorPicker',
  'SColorSlider',
  'SColorSwatch',
  'SColorSwatchPicker',
  'SCombobox',
  'SCommand',
  'SConfigProvider',
  'SContextMenu',
  'SContextMenuCheckbox',
  'SContextMenuRadio',
  'SContextMenuWrapper',
  'SDateField',
  'SDatePicker',
  'SDateRangeField',
  'SDateRangePicker',
  'SDialog',
  'SDialogProvider',
  'SDrawer',
  'SDropdownMenu',
  'SDropdownMenuCheckbox',
  'SDropdownMenuRadio',
  'SDropdownMenuWrapper',
  'SEditable',
  'SEmpty',
  'SForm',
  'SFormFieldBase',
  'SHoverCard',
  'SIcon',
  'SInput',
  'SInputClear',
  'SInputNumber',
  'SInputOtp',
  'SKbd',
  'SLabel',
  'SLayout',
  'SLayoutTrigger',
  'SLink',
  'SList',
  'SListItem',
  'SMenubar',
  'SMenuCheckboxOptions',
  'SMenuOptions',
  'SMenuRadioOptions',
  'SNavMenu',
  'SPageTabs',
  'SPagination',
  'SPalettePicker',
  'SPassword',
  'SPopconfirm',
  'SPopconfirmCancel',
  'SPopconfirmConfirm',
  'SPopover',
  'SProgress',
  'SProgressCircle',
  'SProgressProvider',
  'SRadioGroup',
  'SRadioGroupCard',
  'SRating',
  'SScrollArea',
  'SSegment',
  'SSelect',
  'SSeparator',
  'SSkeleton',
  'SSlider',
  'SSpinner',
  'SSplitNav',
  'SSplitterGroup',
  'SSplitterPanel',
  'SSplitterResizeHandle',
  'SStepper',
  'SSwitch',
  'STable',
  'STableCell',
  'STableRow',
  'STabs',
  'STag',
  'STagsInput',
  'STagsInputItemDelete',
  'STagsInputItemText',
  'STextarea',
  'STextareaClear',
  'SThemeCustomizer',
  'SThemeModeSelect',
  'SThemeModeSwitch',
  'STimeField',
  'STimeRangeField',
  'SToastProvider',
  'SToggle',
  'SToggleGroup',
  'SToggleGroupItem',
  'SToolbar',
  'SToolbarButton',
  'SToolbarLink',
  'SToolbarSeparator',
  'SToolbarToggleGroup',
  'SToolbarToggleItem',
  'STooltip',
  'STree',
  'STreeItem',
  'STreeMenu',
  'STreeMenuStyledItem',
  'STreeNav',
  'STreeVirtualizer',
  'STreeVirtualizerItem',
  'SVirtualizer',
  'SVirtualizerItem',
  'SWatermark'
];

// ---------------------------------------------------------------------------
// Derived lookups
// ---------------------------------------------------------------------------

const sExportSet = new Set(S_EXPORTS);

/** `SButtonGroup` → `button-group` */
function toKebab(name, prefixLength) {
  return name
    .slice(prefixLength)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

/**
 * Rewrite the prefix.
 *
 * @param {string} text
 * @param {{ from: string, to: string }} options
 * @returns {{ text: string, counts: Record<string, number> }}
 */
function renamePrefix(text, { from, to }) {
  const counts = { 组件标识符: 0, '模板 kebab 标签': 0 };

  // --- 1. PascalCase identifiers -------------------------------------------
  // Exact allow-list match. `\bS[A-Za-z0-9]*\b` finds candidates, the Set
  // decides — SCSS / SIGTERM / ScrollAreaRoot all fall through untouched.
  const identifierRe = new RegExp(`\\b${escapeRe(from)}[A-Za-z0-9]*\\b`, 'g');

  text = text.replace(identifierRe, match => {
    if (!sExportSet.has(match)) return match;
    counts['组件标识符'] += 1;
    return to + match.slice(from.length);
  });

  // --- 2. kebab-case, tag position only ------------------------------------
  // <s-button> / </s-button> — never bare `s-`, which would destroy
  // `border-s`, `rounded-s-md`, `text-s` (Tailwind logical properties).
  // key must carry the prefix in kebab form (`s-button`), not just `button`.
  const kebabOf = new Map(
    S_EXPORTS.map(name => [
      `${from.toLowerCase()}-${toKebab(name, from.length)}`,
      `${to.toLowerCase()}-${toKebab(to + name.slice(from.length), to.length)}`
    ])
  );

  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/g;

  text = text.replace(tagRe, (full, slash, tag) => {
    const renamed = kebabOf.get(tag);
    if (renamed === undefined) return full;
    counts['模板 kebab 标签'] += 1;
    return `<${slash}${renamed}`;
  });

  return { text, counts };
}

function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// File collection
// ---------------------------------------------------------------------------

/**
 * @param {string} root
 * @param {{ docs: boolean, includeHistory: boolean }} options
 */
async function collectFiles(root, options) {
  /** @type {string[]} */
  const files = [];

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

      const ext = path.extname(entry.name).toLowerCase();
      const isCode = CODE_EXT.has(ext);
      const isDoc = options.docs && DOC_EXT.has(ext);
      if (!isCode && !isDoc) continue;

      const relative = path.relative(root, full).replace(/\\/g, '/');

      if (!options.includeHistory && HISTORY_PATTERNS.some(re => re.test(relative))) {
        continue;
      }

      files.push(full);
    }
  }

  const info = await statSafe(root);
  if (info?.isFile()) return [root];

  await walk(root);
  files.sort();
  return files;
}

async function statSafe(target) {
  try {
    const { stat } = await import('node:fs/promises');
    return await stat(target);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const HELP = `vbean-codemod · components —— 组件前缀重命名（默认 S → V）

用法:
  node rename-components.mjs [目标目录] [选项]

选项:
  --write                  真正写入文件（默认只预览，不写盘）
  --from=<前缀>            要替换掉的前缀，默认 S
  --to=<前缀>              目标前缀，默认 V
  --docs                   同时处理 Markdown（默认只改代码文件）
  --include-history        连 CHANGELOG / 迁移文档 / 重命名方案一起改（不推荐）
  --quiet                  只输出汇总，不逐文件打印 diff
  -h, --help               显示帮助

示例:
  node rename-components.mjs .                        # 预览
  node rename-components.mjs . --write                # 写入
  node rename-components.mjs . --write --docs         # 连文档一起改
  node rename-components.mjs . --to=VB --write        # 改成别的前缀

注意: 本脚本默认跳过 CHANGELOG.md、*/migration/* 与 rebrand-vbean.md ——
改写历史记录会让它们失真。确需覆盖时加 --include-history。
`;

function parseArgs(argv) {
  const options = {
    target: process.cwd(),
    write: false,
    from: 'S',
    to: 'V',
    docs: false,
    includeHistory: false,
    quiet: false,
    help: false
  };

  const positional = [];

  for (const arg of argv) {
    if (arg === '-h' || arg === '--help') options.help = true;
    else if (arg === '--write') options.write = true;
    else if (arg === '--docs') options.docs = true;
    else if (arg === '--include-history') options.includeHistory = true;
    else if (arg === '--quiet') options.quiet = true;
    else if (arg.startsWith('--from=')) options.from = arg.slice('--from='.length);
    else if (arg.startsWith('--to=')) options.to = arg.slice('--to='.length);
    else if (arg.startsWith('-')) throw new Error(`未知选项: ${arg}`);
    else positional.push(arg);
  }

  if (positional.length > 0) options.target = positional[0];

  if (!/^[A-Z][A-Za-z0-9]*$/.test(options.from)) {
    throw new Error(`--from 需以大写字母开头的合法标识符前缀，收到: ${options.from}`);
  }

  if (!/^[A-Z][A-Za-z0-9]*$/.test(options.to)) {
    throw new Error(`--to 需以大写字母开头的合法标识符前缀，收到: ${options.to}`);
  }

  if (options.from === options.to) {
    throw new Error(`--from 与 --to 相同（都是 ${options.from}），没有可改的内容`);
  }

  return options;
}

// ---------------------------------------------------------------------------
// Diff helper
// ---------------------------------------------------------------------------

function lineDiff(before, after, limit = 6) {
  const a = before.split('\n');
  const b = after.split('\n');
  const shown = [];
  let hidden = 0;

  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i += 1) {
    if (a[i] === b[i]) continue;
    if (shown.length >= limit) {
      hidden += 1;
      continue;
    }
    shown.push({ line: i + 1, before: a[i] ?? '', after: b[i] ?? '' });
  }

  return { shown, hidden };
}

function truncate(line, width = 96) {
  const clean = line.trim();
  return clean.length > width ? `${clean.slice(0, width - 1)}…` : clean;
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

  const files = await collectFiles(options.target, options);
  const totals = new Map();
  const changed = [];

  for (const file of files) {
    let before;
    try {
      before = await readFile(file, 'utf8');
    } catch {
      continue;
    }

    if (before.length > MAX_FILE_BYTES) continue;
    if (before.includes('\u0000')) continue;
    if (!before.includes(options.from)) continue;

    const { text: after, counts } = renamePrefix(before, options);
    if (after === before) continue;

    for (const [id, count] of Object.entries(counts)) {
      totals.set(id, (totals.get(id) ?? 0) + count);
    }

    const relative = path.relative(options.target, file) || path.basename(file);
    changed.push({ relative, before, after });

    if (options.write) {
      await writeFile(file, after, 'utf8');
    }
  }

  // ---- report --------------------------------------------------------------
  const mode = options.write ? '已写入' : '预览（未写入）';
  console.log(`\n  vbean-codemod · components=${options.from}→${options.to} · ${mode}`);
  console.log(`  扫描目录: ${options.target}`);
  console.log(`  扫描文件: ${files.length}`);
  console.log(`  白名单组件: ${S_EXPORTS.length}`);

  if (changed.length === 0) {
    console.log('\n  ✓ 没有需要变更的内容（脚本是幂等的）。\n');
  } else {
    if (!options.quiet) {
      console.log('');
      for (const entry of changed) {
        console.log(`  ── ${entry.relative}`);
        const { shown, hidden } = lineDiff(entry.before, entry.after);
        for (const line of shown) {
          console.log(`     ${String(line.line).padStart(4)} - ${truncate(line.before)}`);
          console.log(`          + ${truncate(line.after)}`);
        }
        if (hidden > 0) console.log(`          … 另有 ${hidden} 处变更`);
      }
    }

    console.log(`\n  变更文件: ${changed.length}`);
    const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
    for (const [id, count] of sorted) {
      console.log(`    ${id.padEnd(20)} ${count}`);
    }

    if (!options.write) {
      console.log('\n  这是预览。确认无误后加 --write 落盘。');
    }
  }

  // ---- manual steps --------------------------------------------------------
  console.log('\n  仍需人工完成:');
  for (const step of [
    '检查下游 CSS 是否有 .s-xxx 选择器或类名 —— 本脚本只改标签位置与标识符，不碰样式表里的类名',
    '检查 headless 包中遗留的 S* 组件 name（如 SFormCompact、STag），它们不属于 ui 层白名单',
    '若项目里同时使用了 Vuetify，确认 V 前缀不会造成阅读混淆'
  ]) {
    console.log(`    · ${step}`);
  }

  if (!options.docs) {
    console.log('    · 文档未处理：需要时加 --docs（仍会跳过 CHANGELOG 与迁移文档）');
  }

  if (!options.includeHistory) {
    console.log('    · 已跳过 CHANGELOG.md、*/migration/*、rebrand-vbean.md —— 历史记录不宜改写');
  }

  console.log('');
}

main().catch(error => {
  console.error(`\n  ✖ ${error.stack ?? error.message}\n`);
  process.exit(1);
});
