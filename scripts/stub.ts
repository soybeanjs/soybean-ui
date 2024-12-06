import { ensureBackupDir, getPkgs, handleStub } from './_shared';

const pkgs = getPkgs();

async function start() {
  await ensureBackupDir();

  pkgs.forEach(({ pkgName, pkgPath }) => {
    handleStub(pkgName, pkgPath);
  });
}

start();
