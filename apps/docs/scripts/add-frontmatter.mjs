/**
 * One-off codemod: inject `head: { title, description }` frontmatter into every
 * markdown file under `src/content/{en,zh}` so the ubean markdown pipeline
 * (unplugin-vue-markdown `headEnabled` + `headField: 'head'`) emits a
 * component-level `useHead()` call for SSG/SPA titles.
 *
 * - title: the first ATX `# ` heading (inline markdown stripped).
 * - description: the first paragraph after the title, or the first blockquote
 *   line when the doc opens with one (mirrors the old site's lead text).
 * - Existing frontmatter is preserved and merged: a top-level `title` /
 *   `description` is moved into `head`; a pre-existing `head` block keeps its
 *   own keys and only gets missing `title` / `description` filled in.
 *
 * Usage: node scripts/add-frontmatter.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(rootDir, 'src/content');
const dryRun = process.argv.includes('--dry');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

/** Split a file into (frontmatterLines|null, bodyLines). */
function splitFrontmatter(lines) {
  if (lines[0]?.trim() !== '---') return [null, lines];
  const end = lines.indexOf('---', 1);
  if (end === -1) return [null, lines];
  return [lines.slice(1, end), lines.slice(end + 1)];
}

/** Parse only the keys we care about: head.title, head.description, title, description. */
function parseExistingMeta(fmLines) {
  const meta = { headTitle: null, headDescription: null, title: null, description: null, hasHead: false };
  let section = null;

  for (const line of fmLines) {
    if (/^\S/.test(line)) {
      if (line.startsWith('head:')) {
        section = 'head';
        meta.hasHead = true;
      } else if (line.startsWith('title:')) {
        section = null;
        meta.title = unquote(line.slice(6).trim());
      } else if (line.startsWith('description:')) {
        section = null;
        meta.description = unquote(line.slice(12).trim());
      } else {
        section = null;
      }
      continue;
    }
    if (section !== 'head') continue;
    const t = line.match(/^\s+title:\s*(.*)$/);
    if (t) meta.headTitle = unquote(t[1].trim());
    const d = line.match(/^\s+description:\s*(.*)$/);
    if (d) meta.headDescription = unquote(d[1].trim());
  }

  return meta;
}

function unquote(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

/** YAML scalar: quote only when needed. */
function yq(value) {
  if (!value) return '';
  const needsQuote = /[:#{}[\],&*?|>'"%@`]|^\s|\s$/.test(value) || /^-|^$/.test(value);
  const escaped = value.replace(/"/g, '\\"');
  return needsQuote ? `"${escaped}"` : escaped;
}

/** Strip inline markdown syntax for a plain-text title/description. */
function stripInline(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .trim();
}

function extractMeta(bodyLines) {
  let title = null;
  let description = null;

  // title: first ATX h1
  for (const line of bodyLines) {
    const m = line.match(/^# (.*\S)\s*$/);
    if (m) {
      title = stripInline(m[1]);
      break;
    }
    if (/^#{2,} /.test(line) || line.trim()) break;
  }

  if (!title) return { title, description };

  // description: first blockquote right after title, else the first prose
  // paragraph (skipping section headings such as `## Overview`).
  const after = bodyLines.slice(bodyLines.findIndex(l => /^# (.*\S)\s*$/.test(l)) + 1);
  let i = 0;
  while (i < after.length && !after[i].trim()) i += 1;

  if (i < after.length && after[i].startsWith('>')) {
    description = stripInline(after[i].replace(/^>\s*/, ''));
  } else {
    const para = [];
    for (; i < after.length; i += 1) {
      const line = after[i];
      const trimmed = line.trim();
      if (!trimmed) {
        if (para.length) break;
        continue;
      }
      if (/^(#{1,6} |```|<|\||>|!\[)/.test(trimmed) || /^[-*+] /.test(trimmed)) continue;
      para.push(trimmed);
    }
    if (para.length) description = stripInline(para.join(' '));
  }

  return { title, description };
}

function rebuild(fmLines, bodyLines, title, description) {
  const lines = [];
  const head = [];

  while (bodyLines.length && !bodyLines[0].trim()) bodyLines = bodyLines.slice(1);

  if (title) head.push(`  title: ${yq(title)}`);
  if (description) head.push(`  description: ${yq(description)}`);

  if (!fmLines) {
    if (!head.length) return null;
    lines.push('---', 'head:', ...head, '---', '');
    return [...lines, ...bodyLines];
  }

  const existing = parseExistingMeta(fmLines);
  const kept = [];
  let inHead = false;

  for (const line of fmLines) {
    if (/^\S/.test(line)) {
      inHead = line.startsWith('head:');
      if (line.startsWith('title:') || line.startsWith('description:') || inHead) continue;
      kept.push(line);
      continue;
    }
    if (inHead) continue;
    kept.push(line);
  }

  const merged = [...head];
  if (existing.hasHead) {
    if (existing.headTitle && !title) merged.unshift(`  title: ${yq(existing.headTitle)}`);
    if (existing.headDescription && !description) merged.push(`  description: ${yq(existing.headDescription)}`);
  }
  if (!merged.length) return null;

  return ['---', ...kept, 'head:', ...merged, '---', '', ...bodyLines];
}

let changed = 0;
let skipped = 0;

for (const file of walk(contentDir)) {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split('\n');
  const [fmLines, bodyLines] = splitFrontmatter(lines);
  const { title, description } = extractMeta(bodyLines);

  if (!title && !description) {
    skipped += 1;
    continue;
  }

  const next = rebuild(fmLines, bodyLines, title, description);
  if (!next) {
    skipped += 1;
    continue;
  }

  const nextRaw = next.join('\n');
  if (nextRaw === raw) continue;

  changed += 1;
  if (!dryRun) fs.writeFileSync(file, nextRaw);
}

console.log(`frontmatter: ${changed} updated, ${skipped} skipped`);
