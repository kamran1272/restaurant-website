const PUBLIC_URL = process.env.PUBLIC_URL || '';

function resolveBasePath() {
  if (!PUBLIC_URL) {
    return '';
  }

  try {
    const { pathname } = new URL(PUBLIC_URL, 'https://example.com');
    return pathname === '/' ? '' : pathname.replace(/\/$/, '');
  } catch {
    return PUBLIC_URL.replace(/\/$/, '');
  }
}

export const BASE_PATH = resolveBasePath();

export function withBasePath(path = '') {
  if (!path) {
    return BASE_PATH || '/';
  }

  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}` || normalizedPath;
}

export function buildAbsoluteUrl(path = '') {
  return new URL(withBasePath(path), window.location.origin).toString();
}
