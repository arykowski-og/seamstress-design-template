import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = [
  { path: '/demo/agents', name: 'agents-list' },
  { path: '/demo/agents/1', name: 'agent-detail' },
  { path: '/demo/agents/1/edit', name: 'agent-edit' },
  { path: '/demo/skills', name: 'skills-list' },
  { path: '/demo/skills/1', name: 'skill-edit' },
  { path: '/demo/tools', name: 'tools-list' },
  { path: '/demo/knowledge', name: 'knowledge' }
];

async function captureScreenshots(outputDir) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Create output directory
  await mkdir(outputDir, { recursive: true });

  for (const pageConfig of pages) {
    const url = `http://localhost:5174${pageConfig.path}`;
    console.log(`Capturing ${pageConfig.name} from ${url}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      const screenshotPath = join(outputDir, `${pageConfig.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`✓ Saved ${screenshotPath}`);
    } catch (error) {
      console.error(`✗ Error capturing ${pageConfig.name}:`, error.message);
    }
  }

  await browser.close();
}

// Run with before/after parameter
const mode = process.argv[2] || 'before';
const outputDir = join(__dirname, '..', 'screenshots', mode);

console.log(`\nCapturing screenshots (${mode} refactoring)...\n`);
captureScreenshots(outputDir)
  .then(() => console.log('\n✓ All screenshots captured'))
  .catch(console.error);