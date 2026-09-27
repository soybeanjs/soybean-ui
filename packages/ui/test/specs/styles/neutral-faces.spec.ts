import { describe, expect, it } from 'vitest';
import { anchorVariants } from '@/styles/anchor';
import { buttonVariants } from '@/styles/button';
import { tableVariants } from '@/styles/table';
import { toggleVariants } from '@/styles/toggle';
import { toggleGroupVariants } from '@/styles/toggle-group';

/**
 * 中性交互面的样式契约。
 *
 * `muted` / `accent` / `secondary` **同档**（对齐 shadcn 默认，docs/theme.md §3.2），角色语义不变：
 * `muted` 是静态面、`accent` 是交互面，但默认值没有档差。于是**不带底色 / 弱底**的中性交互面
 * 只能靠**同一填充的 alpha 阶梯**承担可见性：静止 `accent/40`（或 `card` / 透明）→ hover `accent/60`
 * → 选中 / 按压 `accent`。
 *
 * 这组断言守住两件事：阶梯的类名形状稳定，以及**静止面与交互面相邻时必须是洗色**——
 * 一旦静止面退回实心 `bg-muted`，它与 `accent` 同色，交互 / 选中态会渲染成 Δ = 0
 * （实测色差由 `packages/ui/test/browser/specs/theme/neutral-faces.e2e.spec.ts` 守）。
 * 同时守住 `bg-{accent,secondary}-foreground/10` 这套旧的中性 alpha 面不会回流。
 */
describe('neutral interaction faces', () => {
  describe('button', () => {
    it('drives the fill-less neutral shapes from the accent fill', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        (['ghost', 'outline', 'dashed'] as const).forEach(variant => {
          const cls = buttonVariants({ color, variant });

          expect(cls, `${color}/${variant}`).toContain('data-[normal]:hover:bg-accent/60');
          expect(cls, `${color}/${variant}`).toContain('data-[normal]:active:bg-accent');
          expect(cls, `${color}/${variant}`).toContain('text-accent-foreground');
          expect(cls, `${color}/${variant}`).not.toContain('text-secondary-foreground');
          expect(cls, `${color}/${variant}`).not.toContain('bg-accent-foreground/10');
          expect(cls, `${color}/${variant}`).not.toContain('bg-secondary-foreground/10');
        });
      });
    });

    it('keeps the neutral soft rest a muted wash and its interaction on accent', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        const cls = buttonVariants({ color, variant: 'soft' });

        // `bg-muted/40` 而不是实心 `bg-muted`：实心静止面与 `active:bg-accent` 同色（同档折叠）
        expect(cls, color).toContain('bg-muted/40');
        expect(cls, color).toContain('data-[normal]:hover:bg-accent/60');
        expect(cls, color).toContain('data-[normal]:active:bg-accent');
        expect(cls, color).not.toContain('bg-accent-foreground/10');
        expect(cls, color).not.toContain('bg-secondary-foreground/10');
      });
    });
  });

  describe('toggle', () => {
    it('uses the same ladder for the neutral rest / hover / on faces', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        (['ghost', 'soft'] as const).forEach(variant => {
          const cls = toggleVariants({ color, variant });

          expect(cls, `${color}/${variant}`).toContain('data-[state=off]:hover:bg-accent/60');
          expect(cls, `${color}/${variant}`).toContain('data-[state=on]:bg-accent');
          expect(cls, `${color}/${variant}`).toContain('data-[state=on]:text-accent-foreground');
          expect(cls, `${color}/${variant}`).not.toContain('bg-accent-foreground/10');
          expect(cls, `${color}/${variant}`).not.toContain('bg-secondary-foreground/10');
        });

        // soft 的静止面必须是洗色：实心静止面与 `data-[state=on]:bg-accent` 同色，OFF / ON 无差别
        expect(toggleVariants({ color, variant: 'soft' }), color).toContain('bg-muted/40');
      });

      const outline = toggleVariants({ color: 'accent', variant: 'outline' });

      expect(outline).toContain('hover:bg-accent/60');
      expect(outline).toContain('data-[state=on]:bg-accent');
    });

    it('uses the same ladder in the group recipe', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        (['ghost', 'soft'] as const).forEach(variant => {
          const { item } = toggleGroupVariants({ color, variant });

          expect(item, `${color}/${variant}`).toContain('data-[state=off]:hover:bg-accent/60');
          expect(item, `${color}/${variant}`).toContain('data-[state=on]:bg-accent');
          expect(item, `${color}/${variant}`).not.toContain('bg-accent-foreground/10');
          expect(item, `${color}/${variant}`).not.toContain('bg-secondary-foreground/10');
        });

        expect(toggleGroupVariants({ color, variant: 'soft' }).item, color).toContain('bg-muted/40');
      });
    });
  });

  describe('table', () => {
    it('keeps the zebra rest a muted wash so the row hover stays visible', () => {
      // 斑马纹偶数行的静止面与行 hover 的 `accent` 同档：实心斑马纹会让偶数行的 hover Δ = 0
      const stripe = tableVariants({ striped: true }).row;

      expect(stripe).toContain('data-[row]:even:bg-muted/40');
      expect(tableVariants({}).row).toContain('hover:bg-accent');
    });
  });

  describe('anchor', () => {
    it('puts the neutral active face on the accent fill', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        const { link } = anchorVariants({ color });

        expect(link, color).toContain('data-[state=active]:bg-accent');
        expect(link, color).toContain('data-[state=active]:text-accent-foreground');
        expect(link, color).not.toContain('bg-accent-foreground/10');
        expect(link, color).not.toContain('bg-secondary-foreground/10');
      });
    });
  });

  describe('the neutral static fills stay static', () => {
    it('never paints muted or secondary as a hover / open face', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        (['ghost', 'outline', 'dashed', 'soft'] as const).forEach(variant => {
          const cls = buttonVariants({ color, variant });

          expect(cls, `${color}/${variant}`).not.toContain('hover:bg-muted');
          expect(cls, `${color}/${variant}`).not.toContain('hover:bg-secondary/');
        });
      });
    });
  });
});
