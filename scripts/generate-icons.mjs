#!/usr/bin/env node

/**
 * Generate app icons from ShieldSign logo
 * Run: node scripts/generate-icons.mjs
 */
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const brandingDir = join(rootDir, 'branding', 'logo');
const assetsDir = join(rootDir, 'packages', 'assets');
const publicDir = join(rootDir, 'apps', 'remix', 'public');

const sourceLogo = join(brandingDir, 'shieldsign-logo-transparent.png');

const icons = [
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
];

async function generateIcons() {
  console.log('🛡️  ShieldSign Icon Generator\n');

  if (!existsSync(sourceLogo)) {
    console.error(`❌ Source logo not found: ${sourceLogo}`);
    process.exit(1);
  }

  console.log(`📁 Source: ${sourceLogo}\n`);

  for (const icon of icons) {
    try {
      const buffer = await sharp(sourceLogo)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

      // Save to branding folder
      const brandingPath = join(brandingDir, icon.name);
      await sharp(buffer).toFile(brandingPath);

      // Save to packages/assets
      const assetsPath = join(assetsDir, icon.name);
      await sharp(buffer).toFile(assetsPath);

      // Save to apps/remix/public
      const publicPath = join(publicDir, icon.name);
      await sharp(buffer).toFile(publicPath);

      console.log(`✅ ${icon.name} (${icon.size}x${icon.size})`);
    } catch (err) {
      console.error(`❌ Failed to generate ${icon.name}: ${err.message}`);
    }
  }

  // Generate favicon.ico (multi-size)
  try {
    const sizes = [16, 32, 48];
    const layers = await Promise.all(
      sizes.map((size) =>
        sharp(sourceLogo)
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer(),
      ),
    );

    // For ICO, we'll just use the 32x32 as PNG (browsers accept this)
    // True ICO generation requires additional packages
    console.log(
      `\n⚠️  favicon.ico: Use favicon.io or realfavicongenerator.net for true .ico format`,
    );
  } catch (err) {
    console.error(`❌ Failed to generate favicon.ico: ${err.message}`);
  }

  console.log('\n✨ Icon generation complete!');
  console.log('\nGenerated icons copied to:');
  console.log(`  - ${brandingDir}`);
  console.log(`  - ${assetsDir}`);
  console.log(`  - ${publicDir}`);
}

generateIcons().catch(console.error);
