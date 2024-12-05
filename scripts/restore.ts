import { getPkgs, handleRestore } from './_shared';

const pkgs = getPkgs();

pkgs.forEach(({ pkgName, pkgPath }) => {
  handleRestore(pkgName, pkgPath);
});
