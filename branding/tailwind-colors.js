/**
 * ShieldSign - Tailwind Color Configuration
 * Primary: #0a3b3c (deep teal)
 * Accent: #14b8a6 (emerald/light teal)
 * 
 * SPDX-License-Identifier: AGPL-3.0
 * This file is part of ShieldSign, a fork of Documenso.
 */

module.exports = {
  shieldsign: {
    // Primary deep teal palette
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Accent color
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#0a3b3c',  // Primary color
    950: '#042f2e',
    DEFAULT: '#0a3b3c',  // Primary
    accent: '#14b8a6',   // Accent
  },
  
  // Semantic colors
  primary: {
    DEFAULT: '#0a3b3c',
    light: '#0d4a4b',
    dark: '#082d2e',
    foreground: '#f0fdfa',
  },
  
  accent: {
    DEFAULT: '#14b8a6',
    light: '#2dd4bf',
    dark: '#0d9488',
    foreground: '#042f2e',
  },
  
  // Dark theme background colors
  dark: {
    bg: '#0a3b3c',
    'bg-secondary': '#0d4a4b',
    'bg-tertiary': '#115e59',
    border: '#0f766e',
    'border-light': '#14b8a6',
    text: '#f0fdfa',
    'text-muted': '#99f6e4',
  },
  
  // Light theme
  light: {
    bg: '#ffffff',
    'bg-secondary': '#f8fafc',
    'bg-tertiary': '#f1f5f9',
    border: '#e2e8f0',
    'border-light': '#cbd5e1',
    text: '#0a3b3c',
    'text-muted': '#475569',
  }
};
