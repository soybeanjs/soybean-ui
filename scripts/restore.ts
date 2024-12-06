import { ensureBackupDir, getPkgs, handleRestore } from './_shared';

const pkgs = getPkgs();

async function start() {
  await ensureBackupDir();

  pkgs.forEach(({ pkgName, pkgPath }) => {
    handleRestore(pkgName, pkgPath);
  });
}

start();
