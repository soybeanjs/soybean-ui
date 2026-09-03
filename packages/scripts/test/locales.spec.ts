import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { collectChangedSourceKeys, createLocaleMessages, syncLocaleTemplateFiles } from '../src/shared/json';
import type { JsonObject } from '../src/shared/json';

describe('shared/json locale templates', () => {
  describe('createLocaleMessages', () => {
    const entries = new Map([
      ['api.generated.buttonprops.members.color', 'Theme color of the component.'],
      ['api.generated.buttonprops.members.size', 'Visual size of the component.']
    ]);
    const existingMessages = {
      api: {
        generated: {
          buttonprops: {
            members: {
              color: '已翻译',
              size: '保留'
            }
          }
        }
      }
    };

    it('mirrors source text for the default locale', () => {
      const messages = createLocaleMessages('en', entries, existingMessages, new Set(), 'en');
      const result = messages as Record<string, JsonObject>;

      expect((result.api!.generated as JsonObject).buttonprops).toEqual({
        members: {
          color: 'Theme color of the component.',
          size: 'Visual size of the component.'
        }
      });
    });

    it('keeps existing translations for unchanged source keys', () => {
      const messages = createLocaleMessages('zh', entries, existingMessages, new Set(), 'en');
      const result = messages as Record<string, JsonObject>;

      expect((result.api!.generated as JsonObject).buttonprops).toEqual({
        members: {
          color: '已翻译',
          size: '保留'
        }
      });
    });

    it('blanks out keys whose source changed for non-default locales', () => {
      const messages = createLocaleMessages(
        'zh',
        entries,
        existingMessages,
        new Set(['api.generated.buttonprops.members.color']),
        'en'
      );
      const result = messages as Record<string, JsonObject>;

      expect((result.api!.generated as JsonObject).buttonprops).toEqual({
        members: {
          color: '',
          size: '保留'
        }
      });
    });
  });

  describe('collectChangedSourceKeys', () => {
    it('marks keys whose previous default value differs from the source', () => {
      const previous = {
        api: {
          generated: {
            a: 'old',
            b: 'same'
          }
        }
      };
      const entries = new Map([
        ['api.generated.a', 'new'],
        ['api.generated.b', 'same']
      ]);

      expect(collectChangedSourceKeys(entries, previous)).toEqual(new Set(['api.generated.a']));
    });
  });

  describe('syncLocaleTemplateFiles', () => {
    it('writes locale templates and reports changed source keys', async () => {
      const rootDir = await mkdtemp(path.join(tmpdir(), 'sui-locales-'));
      const outputDir = path.join(rootDir, 'out');

      try {
        await mkdir(outputDir, { recursive: true });
        await writeFile(
          path.join(outputDir, 'en.json'),
          JSON.stringify({ api: { generated: { a: 'old', b: 'same' } } })
        );
        await writeFile(
          path.join(outputDir, 'zh.json'),
          JSON.stringify({ api: { generated: { a: '已翻译', b: '保留' } } })
        );

        const entries = new Map([
          ['api.generated.a', 'new'],
          ['api.generated.b', 'same']
        ]);

        const { changedSourceKeys } = await syncLocaleTemplateFiles({
          entries,
          locales: ['en', 'zh'],
          outputDir,
          defaultLocale: 'en'
        });

        expect(changedSourceKeys).toEqual(new Set(['api.generated.a']));

        const en = JSON.parse(await readFile(path.join(outputDir, 'en.json'), 'utf8')) as JsonObject;
        const zh = JSON.parse(await readFile(path.join(outputDir, 'zh.json'), 'utf8')) as JsonObject;

        expect(en).toEqual({ api: { generated: { a: 'new', b: 'same' } } });
        expect(zh).toEqual({ api: { generated: { a: '', b: '保留' } } });
      } finally {
        await rm(rootDir, { recursive: true, force: true });
      }
    });
  });
});
