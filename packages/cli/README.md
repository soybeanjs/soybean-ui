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
```

## Commands

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `init` / `create` | Initialize your project with vean.json          |
| `add`             | Add components to your project                  |
| `build`           | Build registry JSON from UI layer source        |
| `diff`            | Show diff between local and registry components |
| `search`          | Search available components                     |
| `view`            | View component source code                      |
| `info`            | Show project and registry information           |

## License

MIT
