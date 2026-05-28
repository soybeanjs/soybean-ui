---
description: Install SoybeanUI skills so AI coding agents can understand the styled and headless packages, component patterns, theming, and generated references.
---

# Skills

> Install SoybeanUI skills to give AI coding agents deep knowledge of components, theming, headless composition patterns, and generated references.

## What are Skills?

Skills are structured knowledge files for AI coding agents. They package library-specific guidance, workflows, and references so an agent can load the right context when a task matches.

Unlike MCP servers, skills do not provide live tools. They provide curated instructions and references directly in the model context.

SoybeanUI currently ships two public skills:

- **soybean-ui** - styled package usage, theming, docs navigation, and generated component references
- **soybean-headless** - headless primitives, Compact patterns, composition guidance, and shared component references

## What the SoybeanUI skills cover

The bundled skills help agents answer tasks such as:

- when to choose `@soybeanjs/ui` versus `@soybeanjs/headless`
- how to set up theming, locale, and direction
- how to use component APIs and generated references efficiently
- how to compose headless primitives into custom-styled wrappers
- how to navigate the docs and generated references without loading the whole site

## Usage

### Skills CLI

The easiest installation path is the `skills` CLI:

```bash
npx skills add soybeanjs/soybean-ui/ui-skills
```

You can target a specific agent:

```bash
npx skills add soybeanjs/soybean-ui/ui-skills --agent cursor
npx skills add soybeanjs/soybean-ui/ui-skills --agent claude-code
```

Or install globally so the skills are available across projects:

```bash
npx skills add soybeanjs/soybean-ui/ui-skills --global
```

Installing the package adds both `soybean-ui` and `soybean-headless`.

### Skills URL

If your tool supports direct skill URLs, you can point it at the public GitHub skill directory.

For the styled UI skill:

```text
https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui
```

For the headless skill:

```text
https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless
```

### Claude Code

Claude Code can install an individual skill directly from the GitHub directory:

```bash
claude skill add https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui
claude skill add https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless
```

The repository also ships Claude marketplace metadata inside the published skills package.

### Other AI tools

Any tool that supports GitHub-hosted skill folders or custom instruction directories can use the same sources.

- **SoybeanUI skill entry**: https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui/SKILL.md
- **SoybeanUI skill directory**: https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui
- **SoybeanHeadless skill entry**: https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless/SKILL.md
- **SoybeanHeadless skill directory**: https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless

## Practical recommendations

1. Install the full `@soybeanjs/ui-skills` package when you work with both styled and headless packages.
2. Use `soybean-ui` when you need component usage, theming, and docs navigation help.
3. Use `soybean-headless` when you need composition guidance or custom-styled wrapper patterns.
4. Keep `llms.txt` as a complementary source when you need docs-wide context instead of packaged skill context.

## Related pages

- [Introduction](/overview/introduction)
- [Quick Start](/overview/quick-start)
- [Theming](/overview/theming)
- [LLMs.txt](/overview/llms)
- [Components](/components)
