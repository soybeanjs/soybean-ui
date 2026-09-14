import { resolveTranslateTargetKeys, translateTargetKeys } from '../src/shared/translate';

describe('shared/translate target resolution', () => {
  it('resolves one surface', () => {
    expect(resolveTranslateTargetKeys('api')).toEqual(['api']);
    expect(resolveTranslateTargetKeys('locale')).toEqual(['locale']);
  });

  it('resolves `all` in a stable order', () => {
    expect(resolveTranslateTargetKeys('all')).toEqual(['api', 'changelog', 'locale']);
    expect(translateTargetKeys).toEqual(resolveTranslateTargetKeys('all'));
  });

  it('rejects unknown targets', () => {
    expect(() => resolveTranslateTargetKeys('gen')).toThrow(/Unknown translate target: gen/u);
    expect(() => resolveTranslateTargetKeys('All')).toThrow(/Unknown translate target: All/u);
  });
});
