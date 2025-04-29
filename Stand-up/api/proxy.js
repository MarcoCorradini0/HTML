// filepath: marco@WDEV-Corradini:~/projects/HTML/Stand-up/api/proxy.js
export default async function handler(req, res) {
    const { path } = req.query; // Extract the API path from the query
    const apiUrl = `https://standupparo-apis.vercel.app/${path}`;
  
    const headers = {
      ...req.headers,
      host: undefined, // Remove the host header to avoid conflicts
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: req.method,
        headers,
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Errore nel proxy', details: error.message });
    }
  }