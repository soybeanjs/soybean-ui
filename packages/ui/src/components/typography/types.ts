import type { ClassValue, UiClass } from '@soybeanjs/headless/types';
import type {
  TypographyParagraphSlotProps,
  TypographyTitleProps as _TypographyTitleProps,
  TypographyParagraphProps as _TypographyParagraphProps,
  TypographyTextProps as _TypographyTextProps
} from '@soybeanjs/headless/typography';

/**
 * UI class overrides for the TypographyParagraph copy button.
 */
export type TypographyParagraphUi = UiClass<'root' | 'copyButton'>;

/**
 * Properties for the TypographyTitle component.
 */
export interface TypographyTitleProps extends _TypographyTitleProps {
  /**
   * root class
   */
  class?: ClassValue;
}

/**
 * Properties for the TypographyParagraph component.
 */
export interface TypographyParagraphProps extends _TypographyParagraphProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the copy button.
   */
  ui?: Partial<TypographyParagraphUi>;
}

/**
 * Properties for the TypographyText component.
 */
export interface TypographyTextProps extends _TypographyTextProps {
  /**
   * root class
   */
  class?: ClassValue;
}

export type { TypographyParagraphSlotProps };
