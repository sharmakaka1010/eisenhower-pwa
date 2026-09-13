import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { code } = req.query;

  if (!code || code.length < 6) {
    return res.status(400).json({ error: 'Valid 6-character sync code required.' });
  }

  const kvKey = `sync_${code}`;

  try {
    if (req.method === 'GET') {
      const data = await kv.get(kvKey);
      if (!data) {
        return res.status(404).json({ error: 'No data found for this sync code.' });
      }
      return res.status(200).json(data);
    } 
    
    if (req.method === 'POST') {
      const payload = req.body;
      if (!payload || !payload.tasks) {
        return res.status(400).json({ error: 'Invalid payload.' });
      }
      // Save to Vercel KV
      await kv.set(kvKey, payload);
      return res.status(200).json({ success: true, message: 'Synced successfully.' });
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('KV Error:', error);
    return res.status(500).json({ error: 'Internal Server Error. Make sure Vercel KV is linked.' });
  }
}
