import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const jsDir = join(publicDir, 'js');

await mkdir(jsDir, { recursive: true });
await copyFile(
    join(root, 'dist/js/page-flip.browser.js'),
    join(jsDir, 'page-flip.browser.js')
);

const html = (await readFile(join(root, 'demo/index.html'), 'utf8')).replace(
    '../dist/js/page-flip.browser.js',
    './js/page-flip.browser.js'
);

await writeFile(join(publicDir, 'index.html'), html);
