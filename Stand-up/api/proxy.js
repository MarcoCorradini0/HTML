export default async function handler(req, res) {
  const { path } = req.query;
  const apiUrl = `https://standupparo-apis.vercel.app/${path}`;

  const headers = {
    ...req.headers,
    host: undefined,
  };

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel proxy', details: error.message });
  }
}
