import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const sourceDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(sourceDirectory, '..');
const outputFile = resolve(projectDirectory, 'firebase-public/firebase-sdk.bundle.js');

await build({
  entryPoints: [resolve(sourceDirectory, 'firebase-client-entry.js')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2022'],
  minify: true,
  legalComments: 'eof',
  outfile: outputFile,
});

const { size } = await stat(outputFile);
console.log(`Built Firebase Web SDK bundle (${(size / 1024).toFixed(0)} KiB): ${outputFile}`);
