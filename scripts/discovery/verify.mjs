import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist');
const canonicalOrigin = 'https://www.mkloz.com';

const readOutput = (relativePath) => readFile(path.join(outputDirectory, relativePath), 'utf8');

const portfolio = JSON.parse(await readOutput('portfolio.json'));
const projectRoutes = portfolio.projects.map((project) => `/projects/${project.slug}`);
const indexableRoutes = ['/', ...projectRoutes];

for (const route of indexableRoutes) {
  const relativeFile = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  const document = await readOutput(relativeFile);
  const canonicalUrl = new URL(route, canonicalOrigin).href;

  assert.match(document, /<meta name="description" content="[^"]+" \/>/u, `${route} is missing a description.`);
  assert.ok(document.includes(`<link rel="canonical" href="${canonicalUrl}" />`), `${route} has a wrong canonical.`);
  assert.ok(document.includes('<meta name="robots" content="index, follow" />'), `${route} must be indexable.`);
  assert.ok(document.includes('property="og:title"'), `${route} is missing Open Graph metadata.`);
  assert.ok(document.includes('name="twitter:card"'), `${route} is missing Twitter metadata.`);
  assert.ok(document.includes('id="portfolio-structured-data"'), `${route} is missing structured data.`);
  assert.ok(document.includes('data-discovery-fallback'), `${route} is missing non-JavaScript discovery content.`);
}

const contactSuccess = await readOutput('contact/success.html');
assert.ok(contactSuccess.includes('noindex, nofollow, noarchive'), 'Contact success must be noindex.');

const notFound = await readOutput('404.html');
assert.ok(notFound.includes('Page not found'), 'The generated 404 page is missing its title.');
assert.ok(notFound.includes('noindex, nofollow, noarchive'), 'The generated 404 page must be noindex.');

const [headers, robots, sitemap, llm, llms, llmsFull, humans] = await Promise.all([
  readOutput('_headers'),
  readOutput('robots.txt'),
  readOutput('sitemap.xml'),
  readOutput('llm.txt'),
  readOutput('llms.txt'),
  readOutput('llms-full.txt'),
  readOutput('humans.txt')
]);

assert.ok(headers.includes('Content-Security-Policy:'), '_headers is missing a Content Security Policy.');
assert.ok(headers.includes('static.cloudflareinsights.com'), 'CSP must allow Cloudflare Web Analytics.');
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), 'robots.txt has a wrong sitemap URL.');
assert.equal(llm, llms, 'llm.txt must mirror the standard llms.txt discovery file.');
assert.ok(llms.includes(`${canonicalOrigin}/llms-full.txt`), 'llms.txt does not link to expanded context.');
assert.ok(llmsFull.includes('## Access boundary'), 'llms-full.txt is missing its access boundary.');
assert.ok(humans.includes(`Canonical: ${canonicalOrigin}`), 'humans.txt has a wrong canonical URL.');

for (const route of indexableRoutes) {
  const routeUrl = new URL(route, canonicalOrigin).href;
  assert.ok(sitemap.includes(`<loc>${routeUrl}</loc>`), `sitemap.xml is missing ${routeUrl}.`);
}

for (const forbidden of ['__APP_PUBLIC_URL__', '@vercel/analytics', 'vercel.json']) {
  assert.ok(!`${headers}\n${robots}\n${sitemap}\n${llms}\n${llmsFull}`.includes(forbidden), `Found ${forbidden}.`);
}

console.log(`Verified ${indexableRoutes.length} indexable routes and the Cloudflare discovery bundle.`);
