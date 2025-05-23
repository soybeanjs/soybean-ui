export const dialogContentCssVars = {
  width: '--soybean-dialog-content-width',
  height: '--soybean-dialog-content-height'
};

export const DIALOG_CONSTANTS = {
  DEFAULT_MODAL: true,
  DEFAULT_OPEN: false,
  DEFAULT_TRAP_FOCUS: true,
  DEFAULT_FORCE_MOUNT: false
} as const;

/** Warning message for missing title */
export function getDialogTitleWarning(contentName = 'DialogContent', titleName = 'DialogTitle') {
  return `Warning: \`${contentName}\` requires a \`${titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see the accessibility documentation.`;
}

/** Warning message for missing description */
export function getDialogDescriptionWarning(contentName = 'DialogContent') {
  return `Warning: Missing \`DialogDescription\` or \`aria-describedby="undefined"\` for ${contentName}.`;
}
