import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjMzMWVhYWViZTVkYjI2ZmExZjliNzgzODE0NGRmODI4In0.e30.YTYs07f6YOMSDnz4Jgjywy7nR_M8Mo_7MlCiCOmCfcpupzQ-vRWZUEqajBZwuwIio8kg9BarHBMkydsYdRHVQw'; // Replace with your actual token

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`https://anichin-api.amwp.website/search/${query}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
}
