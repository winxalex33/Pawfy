import fs from 'node:fs/promises';
import path from 'node:path';

const workspacePath = process.cwd();
const workspace = JSON.parse(
  await fs.readFile(path.join(workspacePath, 'angular.json'), 'utf8'),
);
const projectName = Object.keys(workspace.projects)[0];
const buildOptions = workspace.projects[projectName].architect.build.options;
const configuredOutput = buildOptions.outputPath;
const outputBase =
  typeof configuredOutput === 'string'
    ? configuredOutput
    : configuredOutput?.base ?? path.join('dist', projectName);
const browserFolder =
  typeof configuredOutput === 'object' && configuredOutput.browser
    ? configuredOutput.browser
    : 'browser';
const browserPath = path.resolve(workspacePath, outputBase, browserFolder);
const indexPath = path.join(browserPath, 'index.html');

let html = await fs.readFile(indexPath, 'utf8');
const mainScript = html.match(
  /<script\b(?=[^>]*\btype=["']module["'])[^>]*\bsrc=["']([^"']*main(?:-[^/"']+)?\.js(?:\?[^"']*)?)["'][^>]*>/i,
);

if (!mainScript) {
  throw new Error(`Could not find the Angular main module in ${indexPath}`);
}

const mainUrl = new URL(mainScript[1], 'https://build.invalid/');
const mainFile = path.join(
  browserPath,
  decodeURIComponent(mainUrl.pathname).replace(/^\/+/, ''),
);
const mainContents = await fs.readFile(mainFile, 'utf8');
const importPattern =
  /\b(?:import|export)\s*(?:[^"'();]*?\bfrom\s*)?["']([^"']+\.js(?:\?[^"']*)?)["']/g;
const chunkHrefs = new Set();

for (const match of mainContents.matchAll(importPattern)) {
  const specifier = match[1];
  if (!specifier.startsWith('.') && !specifier.startsWith('/')) continue;

  const chunkUrl = new URL(specifier, mainUrl);
  if (chunkUrl.origin !== 'https://build.invalid') continue;

  const chunkFile = path.join(
    browserPath,
    decodeURIComponent(chunkUrl.pathname).replace(/^\/+/, ''),
  );
  try {
    await fs.access(chunkFile);
  } catch {
    continue;
  }

  chunkHrefs.add(`${chunkUrl.pathname}${chunkUrl.search}`);
}

if (chunkHrefs.size === 0) {
  console.log('No local static JS chunks referenced by the main module.');
  process.exit(0);
}

const existingHrefs = new Set(
  [...html.matchAll(/<link\b[^>]*\brel=["']modulepreload["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map(
    (match) => match[1],
  ),
);
const preloadTags = [...chunkHrefs]
  .filter((href) => !existingHrefs.has(href))
  .map((href) => `    <link rel="modulepreload" href="${href}" crossorigin />`)
  .join('\n');

if (preloadTags) {
  html = html.replace('</head>', `${preloadTags}\n  </head>`);
  await fs.writeFile(indexPath, html);
}

console.log(`Preloaded ${chunkHrefs.size} main-module chunk(s).`);
