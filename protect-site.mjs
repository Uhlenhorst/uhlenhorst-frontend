import { readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { encrypt } from 'pagecrypt';

const root = process.cwd();
const dist = path.join(root, 'dist');

const password = process.env.PASSWORD;

if (!password) {
  throw new Error('Die Render-Variable PASSWORD fehlt.');
}

const skip = new Set([
  'dist',
  'node_modules',
  '.git',
  'package.json',
  'package-lock.json',
  'protect-site.mjs'
]);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

async function processFolder(source, target) {
  await mkdir(target, { recursive: true });

  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    if (entry.name.startsWith('.')) continue;

    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await processFolder(sourcePath, targetPath);
      continue;
    }

    if (entry.name.toLowerCase().endsWith('.html')) {
      console.log('Schütze:', entry.name);
      await encrypt(sourcePath, targetPath, password);
    } else {
      await copyFile(sourcePath, targetPath);
    }
  }
}

await processFolder(root, dist);

console.log('Passwortgeschützte Website wurde in dist erstellt.');
