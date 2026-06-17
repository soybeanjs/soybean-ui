/**
 * Syncs the @soybeanjs/* version constant used by project templates.
 *
 * Reads the current version from the root `package.json` and writes it to
 * `packages/sbean/src/templates/versions.ts`. This ensures that newly
 * scaffolded projects always reference the latest published version of
 * internal workspace packages.
 *
 * This script is invoked automatically during `pnpm release-execute`
 * (which runs after `bumpp` bumps all package versions).
 *
 * Usage:
 *   pnpm sync-template-versions
 *   # or: tsx scripts/sync-template-versions.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Read root version
const rootPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
const version = rootPkg.version as string;

if (!version) {
  console.error('❌ Could not read version from root package.json');
  process.exit(1);
}

// Generate versions.ts
const content = `/**
 * Current version of @soybeanjs/* packages.
 *
 * This file is auto-generated during release by \`scripts/sync-template-versions.ts\`.
 * Do not edit manually — run \`pnpm sync-template-versions\` to update.
 *
 * The version is read from the root \`package.json\` at release time so that
 * project templates always scaffold with the latest published version.
 */
export const SOYBEAN_VERSION = '${version}';
`;

const versionsPath = path.join(rootDir, 'packages/sbean/src/templates/versions.ts');
fs.writeFileSync(versionsPath, content, 'utf-8');

console.log(`✔ Synced template versions to ${version}`);
console.log(`  Updated: packages/sbean/src/templates/versions.ts`);
