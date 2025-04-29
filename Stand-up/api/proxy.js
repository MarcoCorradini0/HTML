export default async function handler(req, res) {
  const { path } = req.query;

  const apiUrl = `https://standupparo-apis.vercel.app/${path}`;
  const headers = {
    Authorization: req.headers.authorization || '',
    'Content-Type': 'application/json'
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
