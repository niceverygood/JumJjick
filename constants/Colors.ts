// JUMPICK Color System
// Re-export from Theme for backwards compatibility

import { Theme } from './Theme';

export const Colors = {
  light: {
    text: Theme.colors.textMain,
    background: Theme.colors.background,
    tint: Theme.colors.primary,
    tabIconDefault: Theme.colors.textSub,
    tabIconSelected: Theme.colors.primary,
  },
  dark: {
    text: Theme.colors.textMain,
    background: Theme.colors.background,
    tint: Theme.colors.primary,
    tabIconDefault: Theme.colors.textSub,
    tabIconSelected: Theme.colors.primary,
  },
};

export default Colors;
