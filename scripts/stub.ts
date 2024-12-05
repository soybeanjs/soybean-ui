import { getPkgs, handleStub } from './_shared';

const pkgs = getPkgs();

pkgs.forEach(({ pkgName, pkgPath }) => {
  handleStub(pkgName, pkgPath);
});
