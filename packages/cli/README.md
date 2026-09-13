<p align="center">
  <a href="https://github.com/soybeanjs/vean">
    <img src="https://r2.veanui.com/imgs/logo-vean-ui.svg?v=202609141212" alt="Logo" width="150" />
  </a>
</p>

# Vean CLI

CLI tool for adding Vean components to your Vue apps — copy-paste, like shadcn/ui.

## Usage

```bash
# Initialize your project
npx @vean/cli@latest init

# Add a component
npx @vean/cli@latest add button

# Search components
npx @vean/cli@latest search dialog

# View a component
npx @vean/cli@latest view button

# Migrate a SoybeanUI project to Vean (preview first, then apply)
npx @vean/cli@latest migrate rebrand
npx @vean/cli@latest migrate rebrand --write
```

## Commands

| Command           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| `init` / `create` | Initialize your project with vean.json                            |
| `add`             | Add components to your project                                    |
| `build`           | Build registry JSON from UI layer source                          |
| `diff`            | Show diff between local and registry components                   |
| `search`          | Search available components                                       |
| `view`            | View component source code                                        |
| `info`            | Show project and registry information                             |
| `migrate`         | Migrate a SoybeanUI-era project (`@soybeanjs/*`, `sbean`) to Vean |

### `migrate`

Rewrites a **SoybeanUI-era** project in place — package specifiers always, runtime contracts, CLI
references and hostnames opt-in. Dry run by default; nothing is written without `--write`.

```bash
npx @vean/cli@latest migrate rebrand --write                    # packages + Nuxt dist path
npx @vean/cli@latest migrate rebrand --write --runtime-contract # + data-soybean-* / --soybean-*
npx @vean/cli@latest migrate rebrand --write --cli              # + sbean CLI refs, renames sbean.json
npx @vean/cli@latest migrate rebrand --write --new-domain veanui.com --repo-slug soybeanjs/vean
```

The preflight refuses projects with no SoybeanUI-era trace (`@soybeanjs/*` dependencies or
specifiers, `sbean.json`, runtime contracts, `sbean` invocations) — the run exits 1 and writes
nothing; pass `-f, --force` to override. `--new-domain`, `--new-cdn` and `--repo-slug` work
independently of each other. Each run ends with the opt-in flags still worth adding and the manual
steps that actually apply.

Lock files, `node_modules`, build output and the `CHANGELOG` are never rewritten, and the run is
idempotent. See [`apps/docs/src/content/{en,zh}/ui/migration/rebrand.md`](../../apps/docs/src/content/en/ui/migration/rebrand.md)
for the full guide, including the steps the command cannot do.

## License

MIT
