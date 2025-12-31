export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { path } = req.query;
    
    // Construir URL de destino
    const targetUrl = `https://dev.apinetbo.bekindnetwork.com/api/Authentication${path || ''}`;

    console.log(`[Auth Proxy] ${req.method} ${req.url} → ${targetUrl}`);

    // Preparar headers
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    // Hacer request
    const options = {
      method: req.method,
      headers,
    };

    // Agregar body
    if (req.method !== 'GET') {
      if (req.body instanceof FormData) {
        options.body = req.body;
      } else if (typeof req.body === 'object') {
        options.body = JSON.stringify(req.body);
      } else {
        options.body = req.body;
      }
    }

    const response = await fetch(targetUrl, options);
    const data = await response.text();

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.status(response.status);
    
    if (data) {
      res.send(data);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('[Auth Proxy Error]', error);
    res.status(500).json({ 
      error: 'Proxy Error',
      message: error.message 
    });
  }
}
