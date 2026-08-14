const CANONICAL_HOSTNAME = 'www.mkloz.com';
const ALIAS_HOSTNAMES = new Set(['me.mkloz.com', 'mkloz-portfolio.pages.dev', 'portfolio.mkloz.com']);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const isCertificateValidation = url.pathname.startsWith('/.well-known/acme-challenge/');

  if (ALIAS_HOSTNAMES.has(url.hostname) && !isCertificateValidation) {
    url.hostname = CANONICAL_HOSTNAME;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
