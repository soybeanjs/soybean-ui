import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import {
  PRESET_BASE_COLORS,
  PRESET_PRIMARY_COLORS,
  PRESET_RADII,
  PRESET_ICON_LIBRARIES,
  PRESET_STYLES
} from '../registry/config';
import { getConfig } from '../utils/get-config';
import { getProjectInfo } from '../utils/get-project-info';

const RADIUS_LABEL_MAP: Record<string, string> = {
  none: '0',
  '2xs': '0.25rem',
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '0.875rem',
  '2xl': '1rem'
};

export const infoOptionsSchema = v.object({
  cwd: v.string(),
  json: v.boolean()
});

export const info = new Command()
  .name('info')
  .description('show project and registry information')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .option('--json', 'output as JSON', false)
  .action(async opts => {
    const options = v.parse(infoOptionsSchema, {
      cwd: path.resolve(opts.cwd),
      json: opts.json
    });

    // Detect project
    const projectInfo = await getProjectInfo(options.cwd);
    const config = await getConfig(options.cwd);

    if (options.json) {
      console.log(
        JSON.stringify(
          {
            project: projectInfo,
            config,
            presets: {
              styles: PRESET_STYLES,
              base: PRESET_BASE_COLORS,
              primary: PRESET_PRIMARY_COLORS,
              radius: PRESET_RADII,
              icons: PRESET_ICON_LIBRARIES
            }
          },
          null,
          2
        )
      );

      return;
    }

    console.log();
    console.log('  Project Info');
    console.log('  ────────────');

    if (projectInfo) {
      console.log(`  Framework:      ${projectInfo.framework}`);
      console.log(`  TypeScript:     ${projectInfo.usesTypeScript ? 'yes' : 'no'}`);
      console.log(`  UnoCSS:         ${projectInfo.usesUnoCSS ? 'yes' : 'no'}`);
      console.log(`  Package mgr:    ${projectInfo.packageManager}`);
    }

    console.log();

    if (config) {
      console.log('  sbean.json Config');
      console.log('  ─────────────────');

      console.log(`  Style:          ${config.style}`);
      console.log(`  Base color:     ${config.uno.base}`);
      console.log(`  Primary color:  ${config.uno.primary}`);
      console.log(`  Feedback:       ${config.uno.feedback ?? 'classic'}`);
      console.log(`  Size:           ${config.uno.size ?? 'md'}`);
      console.log(
        `  Radius:         ${config.uno.radius} (${RADIUS_LABEL_MAP[config.uno.radius] ?? config.uno.radius})`
      );
      console.log(`  Icon library:   ${config.iconLibrary}`);

      if (config.font.sans) {
        console.log(`  Font sans:      ${config.font.sans}`);
      }
      if (config.font.heading) {
        console.log(`  Font heading:   ${config.font.heading}`);
      }

      console.log(`  Menu accent:    ${config.menu.accent}`);
      console.log(`  Menu color:     ${config.menu.color}`);

      if (config.registries && Object.keys(config.registries).length > 0) {
        console.log();
        console.log('  Registries');

        for (const [name, registryUrl] of Object.entries(config.registries)) {
          console.log(`    ${name} -> ${registryUrl}`);
        }
      }

      console.log();
      console.log('  Aliases');
      console.log(`    components → ${config.aliases.components}  →  ${config.resolvedPaths.components}`);
      console.log(
        `    ui         → ${config.aliases.ui ?? `${config.aliases.components}/ui`}  →  ${config.resolvedPaths.ui}`
      );
      console.log(`    utils      → ${config.aliases.utils}  →  ${config.resolvedPaths.utils}`);
      console.log(`    lib        → ${config.aliases.lib ?? ''}  →  ${config.resolvedPaths.lib}`);
    } else {
      console.log('  No sbean.json found. Run "sbean init" to create one.');
    }

    console.log();
    console.log('  Available Preset Values');
    console.log('  ───────────────────────');
    console.log(`  Styles:     ${PRESET_STYLES.join(', ')}`);
    console.log(`  Base:       ${PRESET_BASE_COLORS.join(', ')}`);
    console.log(`  Primary:    ${PRESET_PRIMARY_COLORS.join(', ')}`);
    console.log(`  Radius:     ${PRESET_RADII.join(', ')}`);
    console.log(`  Icons:      ${PRESET_ICON_LIBRARIES.join(', ')}`);
    console.log();
  });
