/**
 * ShieldDocs Sign - Tailwind Color Configuration
 * 
 * Add these colors to packages/ui/tailwind.config.ts
 * Replace 'documenso' color references with 'shielddocs'
 */

module.exports = {
  shielddocs: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Primary
    600: '#0d9488',  // Primary Dark / Hover
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
    DEFAULT: '#14b8a6',
  },
  
  // Dark theme background colors (GitHub-inspired)
  dark: {
    bg: '#0d1117',
    'bg-secondary': '#161b22',
    'bg-tertiary': '#21262d',
    border: '#30363d',
    'border-light': '#484f58',
    text: '#e6edf3',
    'text-muted': '#7d8590',
  }
};

/**
 * Example tailwind.config.ts modification:
 * 
 * import { shielddocs, dark } from './branding/tailwind-colors';
 * 
 * export default {
 *   theme: {
 *     extend: {
 *       colors: {
 *         shielddocs,
 *         dark,
 *         // Replace documenso references:
 *         primary: shielddocs,
 *       }
 *     }
 *   }
 * }
 */
