import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

import {
  type DiscoveryRoute,
  discoveryRoutes,
  getDiscoveryStructuredData,
  notFoundDiscoveryRoute,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL
} from './src/data/discovery';
import { ME } from './src/data/me';
import { projectSummaries } from './src/data/project-summaries';

const rootDirectory = fileURLToPath(new URL('.', import.meta.url));
const outputDirectory = path.join(rootDirectory, 'dist');

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const absoluteRouteUrl = (route: DiscoveryRoute) => new URL(route.path === '/' ? '/' : route.path, SITE_URL).href;

const renderDiscoveryHead = (route: DiscoveryRoute) => {
  const canonicalUrl = absoluteRouteUrl(route);
  const robots = route.indexable ? 'index, follow' : 'noindex, nofollow, noarchive';
  const structuredData = JSON.stringify(getDiscoveryStructuredData(route)).replaceAll('<', '\\u003c');

  return `<!-- discovery:start -->
  <title>${escapeHtml(route.title)}</title>
  <meta name="description" content="${escapeHtml(route.description)}" />
  <meta name="robots" content="${robots}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <meta property="og:type" content="${route.kind === 'project' ? 'article' : 'website'}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${escapeHtml(route.title)}" />
  <meta property="og:description" content="${escapeHtml(route.description)}" />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  <meta property="og:image" content="${escapeHtml(route.image)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(route.title)}" />
  <meta name="twitter:description" content="${escapeHtml(route.description)}" />
  <meta name="twitter:image" content="${escapeHtml(route.image)}" />
  <script id="portfolio-structured-data" type="application/ld+json">${structuredData}</script>
  <!-- discovery:end -->`;
};

const renderProjectFallback = (route: DiscoveryRoute) => {
  const project = projectSummaries.find((item) => item.slug === route.projectSlug);
  if (!project) return '';

  const repositories = project.github
    .map(
      (repository) =>
        `<li><a href="${escapeHtml(repository.link)}" rel="noreferrer">${escapeHtml(repository.name)}</a></li>`
    )
    .join('');

  return `<main data-discovery-fallback>
      <p>${project.year} / ${escapeHtml(project.category)}</p>
      <h1>${escapeHtml(project.title)}</h1>
      <p>${escapeHtml(project.description)}</p>
      <p>Technologies: ${escapeHtml(project.technologies.join(', '))}</p>
      <ul>${repositories}</ul>
      <p><a href="/">Return to ${SITE_NAME}'s portfolio</a></p>
    </main>`;
};

const renderFallback = (route: DiscoveryRoute) => {
  if (route.kind === 'project') return renderProjectFallback(route);

  if (route.kind === 'home') {
    const projects = projectSummaries
      .map(
        (project) => `<li>
          <a href="/projects/${escapeHtml(project.slug)}">${escapeHtml(project.title)}</a>
          <p>${escapeHtml(project.description)}</p>
        </li>`
      )
      .join('');

    return `<main data-discovery-fallback>
      <h1>${SITE_NAME}</h1>
      <p>${escapeHtml(ME.title)}</p>
      <p>${escapeHtml(SITE_DESCRIPTION)}</p>
      <h2>Selected projects</h2>
      <ul>${projects}</ul>
    </main>`;
  }

  return `<main data-discovery-fallback>
      <h1>${escapeHtml(route.title)}</h1>
      <p>${escapeHtml(route.description)}</p>
      <p><a href="/">Return to the portfolio</a></p>
    </main>`;
};

const renderRouteDocument = (source: string, route: DiscoveryRoute) => {
  const withHead = source.replace(
    /<!-- discovery:start -->[\s\S]*?<!-- discovery:end -->/u,
    renderDiscoveryHead(route)
  );
  return withHead.replace('<div id="root"></div>', `<div id="root">${renderFallback(route)}</div>`);
};

const renderRobotsTxt = () => `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const renderSitemapXml = () => {
  const rows = discoveryRoutes
    .filter((route) => route.indexable)
    .map((route) => `  <url><loc>${escapeHtml(absoluteRouteUrl(route))}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>
`;
};

const renderLlmsTxt = () => {
  const projectLinks = projectSummaries
    .map((project) => `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${project.description}`)
    .join('\n');

  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

This is the public portfolio of ${ME.name}, a ${ME.title}. It presents selected full-stack projects, their implementation decisions, technology stacks, and source repositories.

## Main pages

- [Portfolio home](${SITE_URL}/): Overview, experience, working system, selected projects, and contact details.
${projectLinks}

## Additional context

- [Expanded portfolio context](${SITE_URL}/llms-full.txt)
- [Machine-readable portfolio data](${SITE_URL}/portfolio.json)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
};

const renderLlmsFullTxt = () => {
  const projectSections = projectSummaries
    .map((project) => {
      const repositories = project.github.map((repository) => `- ${repository.name}: ${repository.link}`).join('\n');
      return `## ${project.title}

URL: ${SITE_URL}/projects/${project.slug}
Year: ${project.year}
Category: ${project.category}
Summary: ${project.description}
Technologies: ${project.technologies.join(', ')}
Repositories:
${repositories}`;
    })
    .join('\n\n');

  return `# ${SITE_NAME} — expanded portfolio context

${SITE_DESCRIPTION}

Role: ${ME.title}
Location: ${ME.location.city}, ${ME.location.country}
GitHub: ${ME.social.github}
LinkedIn: ${ME.social.linkedin}

The portfolio is a public, evidence-led overview of selected software projects. Project descriptions and technology lists below are sourced from the same repository data used by the website.

${projectSections}

## Access boundary

This file describes only public portfolio information. It does not provide private contact submissions, unpublished project material, credentials, or personal account data.
`;
};

const renderPortfolioJson = () =>
  JSON.stringify(
    {
      schemaVersion: 1,
      canonicalUrl: SITE_URL,
      person: {
        name: ME.name,
        role: ME.title,
        location: `${ME.location.city}, ${ME.location.country}`,
        profiles: { github: ME.social.github, linkedin: ME.social.linkedin }
      },
      projects: projectSummaries.map((project) => ({
        title: project.title,
        slug: project.slug,
        url: `${SITE_URL}/projects/${project.slug}`,
        year: project.year,
        category: project.category,
        description: project.description,
        technologies: project.technologies,
        repositories: project.github
      }))
    },
    null,
    2
  );

const discoveryAssets = (): Plugin => ({
  name: 'portfolio-discovery-assets',
  apply: 'build',
  async closeBundle() {
    const builtIndex = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');

    for (const route of discoveryRoutes) {
      const document = renderRouteDocument(builtIndex, route);
      const routeFile =
        route.path === '/'
          ? path.join(outputDirectory, 'index.html')
          : path.join(outputDirectory, `${route.path.slice(1)}.html`);
      await mkdir(path.dirname(routeFile), { recursive: true });
      await writeFile(routeFile, document);
    }

    await writeFile(path.join(outputDirectory, '404.html'), renderRouteDocument(builtIndex, notFoundDiscoveryRoute));
    await Promise.all([
      writeFile(path.join(outputDirectory, 'robots.txt'), renderRobotsTxt()),
      writeFile(path.join(outputDirectory, 'sitemap.xml'), renderSitemapXml()),
      writeFile(path.join(outputDirectory, 'llm.txt'), renderLlmsTxt()),
      writeFile(path.join(outputDirectory, 'llms.txt'), renderLlmsTxt()),
      writeFile(path.join(outputDirectory, 'llms-full.txt'), renderLlmsFullTxt()),
      writeFile(
        path.join(outputDirectory, 'humans.txt'),
        `${SITE_NAME}\nRole: ${ME.title}\nSource: ${ME.social.github}/portfolio\nCanonical: ${SITE_URL}\n`
      ),
      writeFile(path.join(outputDirectory, 'portfolio.json'), `${renderPortfolioJson()}\n`)
    ]);
  }
});

export default defineConfig({
  plugins: [react(), tailwindcss(), discoveryAssets()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  server: {
    port: 3000,
    strictPort: true
  }
});
