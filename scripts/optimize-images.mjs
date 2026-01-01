#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts large PNG/JPG images to WebP format for better performance.
 * Run with: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  inputDir: path.join(rootDir, 'public/assets/images'),
  minSizeBytes: 50 * 1024, // Only optimize images > 50KB
  webpQuality: 80,
  // Critical images that need responsive variants
  criticalImages: [
    'thumbs/banner-three.png',
    'logo/logo.png',
  ],
  responsiveSizes: [320, 640, 768, 1024],
};

async function getImageFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(inputPath) {
  const relativePath = path.relative(CONFIG.inputDir, inputPath);
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const name = path.basename(inputPath, ext);
  const webpPath = path.join(dir, `${name}.webp`);

  try {
    const stats = await fs.stat(inputPath);

    // Skip small images
    if (stats.size < CONFIG.minSizeBytes) {
      return { skipped: true, reason: 'too small', path: relativePath };
    }

    // Check if WebP already exists and is newer
    try {
      const webpStats = await fs.stat(webpPath);
      if (webpStats.mtime > stats.mtime) {
        return { skipped: true, reason: 'already optimized', path: relativePath };
      }
    } catch {
      // WebP doesn't exist, continue
    }

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    const savings = ((stats.size - webpStats.size) / stats.size * 100).toFixed(1);

    return {
      success: true,
      path: relativePath,
      originalSize: (stats.size / 1024).toFixed(1) + 'KB',
      webpSize: (webpStats.size / 1024).toFixed(1) + 'KB',
      savings: savings + '%',
    };
  } catch (error) {
    return { error: true, path: relativePath, message: error.message };
  }
}

async function createResponsiveVariants(relativePath) {
  const inputPath = path.join(CONFIG.inputDir, relativePath);
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const name = path.basename(inputPath, ext);

  try {
    const stats = await fs.stat(inputPath);
    const results = [];

    for (const width of CONFIG.responsiveSizes) {
      const webpPath = path.join(dir, `${name}-${width}w.webp`);

      await sharp(inputPath)
        .resize(width)
        .webp({ quality: CONFIG.webpQuality })
        .toFile(webpPath);

      const webpStats = await fs.stat(webpPath);
      results.push({
        width,
        size: (webpStats.size / 1024).toFixed(1) + 'KB',
      });
    }

    return { success: true, path: relativePath, variants: results };
  } catch (error) {
    return { error: true, path: relativePath, message: error.message };
  }
}

async function main() {
  console.log('Image Optimization Script');
  console.log('='.repeat(50));

  // Check if sharp is available
  try {
    await sharp({ create: { width: 1, height: 1, channels: 3, background: '#fff' } }).webp().toBuffer();
  } catch (error) {
    console.error('Error: Sharp library not working. Run: npm install sharp');
    process.exit(1);
  }

  // Get all image files
  console.log('\nScanning for images...');
  const imageFiles = await getImageFiles(CONFIG.inputDir);
  console.log(`Found ${imageFiles.length} images`);

  // Create responsive variants for critical images
  console.log('\nCreating responsive variants for critical images...');
  for (const criticalImage of CONFIG.criticalImages) {
    const result = await createResponsiveVariants(criticalImage);
    if (result.success) {
      console.log(`  ${result.path}:`);
      result.variants.forEach(v => console.log(`    - ${v.width}w: ${v.size}`));
    } else if (result.error) {
      console.log(`  ERROR: ${result.path} - ${result.message}`);
    }
  }

  // Optimize all large images
  console.log('\nOptimizing large images to WebP...');
  let optimized = 0;
  let skipped = 0;
  let errors = 0;

  for (const imagePath of imageFiles) {
    const result = await optimizeImage(imagePath);

    if (result.success) {
      console.log(`  ${result.path}: ${result.originalSize} -> ${result.webpSize} (${result.savings} saved)`);
      optimized++;
    } else if (result.skipped) {
      skipped++;
    } else if (result.error) {
      console.log(`  ERROR: ${result.path} - ${result.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Summary: ${optimized} optimized, ${skipped} skipped, ${errors} errors`);
  console.log('\nNext steps:');
  console.log('1. Update your components to use .webp images with PNG fallback');
  console.log('2. Use <picture> element or srcSet for responsive images');
}

main().catch(console.error);
