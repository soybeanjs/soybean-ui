import { describe, expect, it } from 'vitest';
import { anchorVariants } from '@/styles/anchor';
import { buttonVariants } from '@/styles/button';
import { toggleVariants } from '@/styles/toggle';
import { toggleGroupVariants } from '@/styles/toggle-group';

/**
 * 中性交互面的样式契约。
 *
 * `muted` / `secondary` 是静态面，`accent` 是交互面（docs/theme.md §3.2），因此**不带底色 / 弱底**
 * 的中性交互面只能由 `--accent*` 驱动：静止 `muted`（或透明 / `card`）→ hover `accent/60` →
 * 选中 / 按压 `accent`。这组断言守住"改 `--accent` 档位时 icon 按钮、toggle、anchor 跟随"，
 * 也守住 `bg-{accent,secondary}-foreground/10` 这套旧的中性 alpha 面不会回流。
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

    it('keeps the neutral soft rest on the muted block and its interaction on accent', () => {
      (['accent', 'secondary'] as const).forEach(color => {
        const cls = buttonVariants({ color, variant: 'soft' });

        expect(cls, color).toContain('bg-muted');
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
      });
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
