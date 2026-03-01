/**
 * Font configuration for dyslexia-friendly typography
 */

import { Platform } from 'react-native';

export const Fonts = {
  // Font families
  families: {
    openDyslexic: Platform.select({
      ios: 'OpenDyslexic',
      android: 'OpenDyslexic',
      web: 'OpenDyslexic, sans-serif',
      default: 'System',
    }),
    comicSans: Platform.select({
      ios: 'Comic Sans MS',
      android: 'Comic Sans MS',
      web: 'Comic Sans MS, cursive',
      default: 'System',
    }),
    arial: Platform.select({
      ios: 'Arial',
      android: 'sans-serif',
      web: 'Arial, sans-serif',
      default: 'System',
    }),
    verdana: Platform.select({
      ios: 'Verdana',
      android: 'sans-serif',
      web: 'Verdana, sans-serif',
      default: 'System',
    }),
  },
  
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  
  // Font weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
  
  // Letter spacing values
  letterSpacing: {
    normal: 0,
    wide: 0.5,
    extraWide: 1.0,
  },
};

export function getFontFamily(family: 'openDyslexic' | 'comicSans' | 'arial' | 'verdana'): string {
  return Fonts.families[family] ?? Fonts.families.arial;
}
