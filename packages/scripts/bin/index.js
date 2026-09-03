#!/usr/bin/env node
import('../src/index.ts').catch(() => {
  console.error('sui must run through the repo toolchain (pnpm sui).');
  process.exit(1);
});
