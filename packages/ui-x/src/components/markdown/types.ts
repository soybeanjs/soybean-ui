import type { ClassValue } from '@soybeanjs/headless/types';
import type {
  HtmlPolicy,
  MarkdownRender,
  NodeRendererMode,
  NodeRendererTypewriter,
  ParseOptions
} from 'markstream-vue';

type MarkdownRenderProps = InstanceType<typeof MarkdownRender>['$props'];

/**
 * Properties for the SxMarkdown component.
 */
export interface MarkdownProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Markdown source to render. Use this for streaming input — the renderer
   * re-parses incrementally and renders incomplete constructs as placeholders.
   */
  content?: string;
  /**
   * Whether the stream has completed. `true` disables streaming placeholders.
   */
  final?: boolean;
  /**
   * Render pacing mode.
   */
  mode?: NodeRendererMode;
  /**
   * HTML handling policy.
   */
  htmlPolicy?: HtmlPolicy;
  /**
   * Whether to render in dark mode.
   */
  isDark?: boolean;
  /**
   * Typewriter animation.
   */
  typewriter?: NodeRendererTypewriter;
  /**
   * Enable smooth (paced) streaming.
   */
  smoothStreaming?: boolean | 'auto';
  /**
   * Parse options forwarded to the markdown engine.
   */
  parseOptions?: ParseOptions;
  /**
   * Additional props forwarded to the underlying `MarkdownRender`.
   */
  rendererProps?: Partial<MarkdownRenderProps>;
}
