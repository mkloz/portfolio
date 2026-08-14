import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const inputUrl = process.argv[2];
if (!inputUrl) throw new Error('Usage: node scripts/deployment/smoke.mjs <deployment-url>');

const baseUrl = new URL(inputUrl);
const portfolio = JSON.parse(await readFile(new URL('../../dist/portfolio.json', import.meta.url), 'utf8'));
const htmlRoutes = ['/', ...portfolio.projects.map((project) => `/projects/${project.slug}`), '/contact/success'];

for (const route of htmlRoutes) {
  const response = await fetch(new URL(route, baseUrl), { redirect: 'follow' });
  assert.equal(response.status, 200, `${route} returned ${response.status}.`);
  assert.match(response.headers.get('content-type') ?? '', /text\/html/u, `${route} is not HTML.`);
  const body = await response.text();
  assert.ok(body.includes('data-discovery-fallback'), `${route} is missing static discovery content.`);
}

for (const [route, contentType] of [
  ['/robots.txt', /text\/plain/u],
  ['/sitemap.xml', /(?:application|text)\/xml/u],
  ['/llm.txt', /text\/plain/u],
  ['/llms.txt', /text\/plain/u],
  ['/llms-full.txt', /text\/plain/u],
  ['/portfolio.json', /application\/json/u]
]) {
  const response = await fetch(new URL(route, baseUrl));
  assert.equal(response.status, 200, `${route} returned ${response.status}.`);
  assert.match(response.headers.get('content-type') ?? '', contentType, `${route} has a wrong content type.`);
}

const missingResponse = await fetch(new URL('/__portfolio_deployment_smoke_missing__', baseUrl));
assert.equal(missingResponse.status, 404, `Unknown routes must return 404, received ${missingResponse.status}.`);

const homeResponse = await fetch(baseUrl);
assert.ok(homeResponse.headers.has('x-content-type-options'), 'The deployment is missing security headers.');
assert.ok(homeResponse.headers.has('content-security-policy'), 'The deployment is missing its CSP.');

console.log(`Deployment smoke checks passed for ${baseUrl.href}`);
