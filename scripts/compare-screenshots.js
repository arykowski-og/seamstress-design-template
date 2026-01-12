import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = [
  'agents-list',
  'agent-detail',
  'agent-edit',
  'skills-list',
  'skill-edit',
  'tools-list',
  'knowledge'
];

async function compareImages() {
  const beforeDir = join(__dirname, '..', 'screenshots', 'before');
  const afterDir = join(__dirname, '..', 'screenshots', 'after');
  const diffDir = join(__dirname, '..', 'screenshots', 'diff');

  // Create diff directory
  await fs.mkdir(diffDir, { recursive: true });

  console.log('Comparing screenshots...\n');

  let allMatch = true;
  const results = [];

  for (const page of pages) {
    const beforeFile = join(beforeDir, `${page}.png`);
    const afterFile = join(afterDir, `${page}.png`);
    const diffFile = join(diffDir, `${page}-diff.png`);

    try {
      // Check if files exist
      await fs.access(beforeFile);
      await fs.access(afterFile);

      // Use ImageMagick compare command to get pixel difference
      const cmd = `compare -metric AE "${beforeFile}" "${afterFile}" "${diffFile}" 2>&1`;

      try {
        const { stdout, stderr } = await execAsync(cmd);
        const pixelDiff = parseInt(stdout || stderr || '0');

        if (pixelDiff === 0) {
          results.push({ page, status: '✅ IDENTICAL', diff: 0 });
        } else if (pixelDiff < 1000) {
          results.push({ page, status: '⚠️  MINOR', diff: pixelDiff });
        } else {
          results.push({ page, status: '❌ DIFFERENT', diff: pixelDiff });
          allMatch = false;
        }
      } catch (error) {
        // Compare returns exit code 1 when images differ
        const pixelDiff = parseInt(error.stderr || error.stdout || '0');
        if (pixelDiff < 1000) {
          results.push({ page, status: '⚠️  MINOR', diff: pixelDiff });
        } else {
          results.push({ page, status: '❌ DIFFERENT', diff: pixelDiff });
          allMatch = false;
        }
      }
    } catch (error) {
      results.push({ page, status: '⚠️  ERROR', diff: -1, error: error.message });
    }
  }

  // Print results
  console.log('┌─────────────────────┬──────────────┬────────────┐');
  console.log('│ Page                │ Status       │ Pixels Diff│');
  console.log('├─────────────────────┼──────────────┼────────────┤');

  for (const result of results) {
    const page = result.page.padEnd(19);
    const status = result.status.padEnd(12);
    const diff = result.diff === -1 ? 'N/A' : result.diff.toString();
    console.log(`│ ${page} │ ${status} │ ${diff.padEnd(10)} │`);
  }

  console.log('└─────────────────────┴──────────────┴────────────┘');

  if (allMatch) {
    console.log('\n✅ All pages match visually (or have minor differences < 1000 pixels)');
  } else {
    console.log('\n❌ Some pages have visual differences. Check the diff directory for details.');
  }

  return allMatch;
}

// Check if ImageMagick is installed
async function checkImageMagick() {
  try {
    await execAsync('compare -version');
    return true;
  } catch {
    console.error('❌ ImageMagick is not installed. Please install it first:');
    console.error('   brew install imagemagick');
    return false;
  }
}

async function main() {
  if (await checkImageMagick()) {
    const success = await compareImages();
    process.exit(success ? 0 : 1);
  } else {
    process.exit(1);
  }
}

main().catch(console.error);