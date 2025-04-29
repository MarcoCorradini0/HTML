export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Path mancante' });

  const apiUrl = `https://standupparo-apis.vercel.app/${path}`;

  const headers = {
    ...req.headers,
    host: undefined,
  };

  let body;
  if (req.method !== 'GET') {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers).toString();
  }

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers,
      body,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel proxy', details: error.message });
  }
}
