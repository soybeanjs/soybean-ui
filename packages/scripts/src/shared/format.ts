import { spawn } from 'node:child_process';
import process from 'node:process';

const isWindows = process.platform === 'win32';
const fmtBinary = isWindows ? 'vp.cmd' : 'vp';

/** Format generated paths with the workspace formatter so committed output is canonical. */
export async function formatPaths(paths: string[]): Promise<void> {
  if (!paths.length) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const child = spawn(fmtBinary, ['fmt', ...paths], {
      env: process.env,
      stdio: 'inherit'
    });

    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`vp fmt ${paths.join(' ')} exited with code ${code ?? 'unknown'}.`));
    });
  });
}
