# Soybean Skills

Agent skills for `@soybeanjs/ui` and `@soybeanjs/headless`.

## Installation

```bash
npx skills add soybeanjs/soybean-ui/ui-skills
```

The `skills` CLI installs every skill shipped in the package and places them into the correct agent-specific skills directory.

## Included Skills

- `soybean-ui`: Styled SoybeanUI usage, theming, docs, and component references
- `soybean-headless`: Headless primitives, Compact patterns, and composition guidance

## Claude Code Marketplace

```bash
/plugin marketplace add soybean-ui-skills
/plugin install soybean-ui-skills@soybean-ui-skills
```

## Development

Generate the publishable package contents from the source repository:

```bash
pnpm sui skills
```
