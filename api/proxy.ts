import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
    return res.status(200).end();
  }

  try {
    const { pathname, search } = new URL(req.url || '', `http://${req.headers.host}`);
    const targetPath = pathname.replace(/^\/api/, '');
    const targetUrl = `https://dev.api.bekindnetwork.com/api/v1${targetPath}${search}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    if (req.method !== 'GET') {
      headers['Content-Type'] = req.headers['content-type'] || 'application/json';
    }

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body instanceof FormData || typeof req.body === 'string') {
        fetchOptions.body = req.body;
      } else if (req.body) {
        fetchOptions.body = JSON.stringify(req.body);
      }
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.text();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.status(response.status).send(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', message: String(error) });
  }
}
