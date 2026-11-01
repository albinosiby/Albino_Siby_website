import {readFile, mkdir, cp, rm, access} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const catalog = {window: {}};
vm.runInNewContext(await readFile('projects-data.js', 'utf8'), catalog);
const projects = catalog.window.portfolioProjects;
assert.equal(projects.length, 9);
assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
for (const project of projects) {
  if (project.image) await access(project.image);
  for (const link of project.links) assert.equal(new URL(link.url).protocol, 'https:');
}
const html = await readFile('index.html', 'utf8');
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(?:https?:|mailto:|tel:)/.test(path)) await access(path);
}
await rm('dist', {recursive: true, force: true});
await mkdir('dist');
for (const path of ['index.html', 'style.css', 'about.css', 'background.css', 'footer.css', 'projects.css', 'projects.js', 'projects-data.js', 'images']) {
  await cp(path, `dist/${path}`, {recursive: true});
}
console.log(`Static build complete: ${projects.length} projects; local assets and external URL formats validated.`);
