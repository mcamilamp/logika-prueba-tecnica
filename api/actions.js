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
    const { path, pageNumber, pageSize } = req.query;
    
    // Construir URL de destino
    let targetUrl = `https://dev.api.bekindnetwork.com/api/v1${path || ''}`;
    
    // Agregar parámetros query
    const params = new URLSearchParams();
    if (pageNumber) params.append('pageNumber', pageNumber);
    if (pageSize) params.append('pageSize', pageSize);
    if (params.toString()) targetUrl += `?${params.toString()}`;

    console.log(`[API Proxy] ${req.method} ${req.url} → ${targetUrl}`);

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

    // Agregar body si existe
    if (req.method !== 'GET' && req.body) {
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
    console.error('[API Proxy Error]', error);
    res.status(500).json({ 
      error: 'Proxy Error',
      message: error.message 
    });
  }
}
