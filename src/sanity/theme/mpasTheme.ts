import { buildLegacyTheme } from 'sanity';

/** Brand palette, taken from the website's design tokens. */
export const brand = {
  canvas: '#f7f3ea',
  surface: '#ffffff',
  ink: '#18352a',
  green: '#78a84a',
  greenDark: '#245b3a',
  orange: '#e07832',
  orangeRed: '#c95d24',
  muted: '#eee8dc',
};

export const mpasTheme = buildLegacyTheme({
  '--black': brand.ink,
  '--white': brand.surface,
  '--gray': '#6f7a72',
  '--gray-base': '#6f7a72',

  '--component-bg': brand.surface,
  '--component-text-color': brand.ink,

  '--brand-primary': brand.greenDark,

  '--default-button-color': '#6f7a72',
  '--default-button-primary-color': brand.greenDark,
  '--default-button-success-color': brand.green,
  '--default-button-warning-color': brand.orange,
  '--default-button-danger-color': brand.orangeRed,

  '--state-info-color': brand.greenDark,
  '--state-success-color': brand.green,
  '--state-warning-color': brand.orange,
  '--state-danger-color': brand.orangeRed,

  '--main-navigation-color': brand.greenDark,
  '--main-navigation-color--inverted': brand.canvas,

  '--focus-color': brand.orange,
});
