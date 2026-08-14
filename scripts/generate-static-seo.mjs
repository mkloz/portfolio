import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const seo = JSON.parse(await readFile(path.join(root, 'src/data/seo-routes.json'), 'utf8'));

if (!/<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/.test(template)) {
  throw new Error('The route SEO block is missing from dist/index.html.');
}

const escapeHtml = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const absoluteUrl = (value) => new URL(value, seo.site.url).toString();
const person = {
  '@type': 'Person',
  name: seo.site.name,
  url: seo.site.url,
  sameAs: seo.site.sameAs
};

const structuredDataFor = (project) =>
  project
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.name,
        headline: project.title,
        description: project.description,
        url: absoluteUrl(`/projects/${project.slug}`),
        image: absoluteUrl(project.image),
        dateCreated: String(project.year),
        applicationCategory: project.category,
        programmingLanguage: project.technologies,
        codeRepository: project.repository,
        author: person
      }
    : [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: seo.site.name,
          url: seo.site.url,
          inLanguage: seo.site.language
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: seo.site.defaultTitle,
          description: seo.site.description,
          url: seo.site.url,
          inLanguage: seo.site.language,
          mainEntity: {
            ...person,
            jobTitle: 'Full-Stack Developer',
            image: absoluteUrl('/editorial/portrait-screenprint-480.webp'),
            knowsAbout: ['Product interfaces', 'React', 'TypeScript', 'Node.js', 'APIs', 'Databases', 'DevOps']
          }
        }
      ];

const seoBlock = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  indexable = true,
  project
}) => `<!-- route-seo:start -->
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="${escapeHtml(seo.site.name)}" />
  <meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="${escapeHtml(seo.site.name)}" />
  <meta property="og:locale" content="${seo.site.locale}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:alt" content="${escapeHtml(project ? `${project.name} project interface` : 'Mykhailo Kloz portfolio')}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(project ? `${project.name} project interface` : 'Mykhailo Kloz portfolio')}" />
  <script type="application/ld+json" data-route-seo>${JSON.stringify(structuredDataFor(project)).replaceAll('<', '\\u003c')}</script>
  <!-- route-seo:end -->`;

const replaceSeo = (html, block) => html.replace(/<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/, block);
const withoutHomePreloads = (html) => html.replace(/\s*<link[^>]+data-home-only[^>]*>/g, '');

const homeBlock = seoBlock({
  title: seo.site.defaultTitle,
  description: seo.site.description,
  canonical: `${seo.site.url}/`,
  image: absoluteUrl(seo.site.image)
});
await writeFile(path.join(dist, 'index.html'), replaceSeo(template, homeBlock));

for (const project of seo.projects) {
  const routeDirectory = path.join(dist, 'projects', project.slug);
  await mkdir(routeDirectory, { recursive: true });
  const block = seoBlock({
    title: project.title,
    description: project.description,
    canonical: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
    type: 'article',
    project
  });
  await writeFile(path.join(routeDirectory, 'index.html'), withoutHomePreloads(replaceSeo(template, block)));
}

const successDirectory = path.join(dist, 'contact', 'success');
await mkdir(successDirectory, { recursive: true });
await writeFile(
  path.join(successDirectory, 'index.html'),
  withoutHomePreloads(
    replaceSeo(
      template,
      seoBlock({
        title: `Message sent — ${seo.site.name}`,
        description: 'Your message has been sent successfully.',
        canonical: absoluteUrl('/contact/success'),
        image: absoluteUrl(seo.site.image),
        indexable: false
      })
    )
  )
);

const lastModified = new Date().toISOString().slice(0, 10);
const sitemapRoutes = [
  { url: `${seo.site.url}/`, priority: '1.0' },
  ...seo.projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`), priority: '0.8' }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    ({ url, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

console.log(`Generated crawlable metadata for ${seo.projects.length + 1} public routes.`);
