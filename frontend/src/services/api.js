import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function checkHealth() {
  const response = await client.get('/');
  return response.data;
}

export async function predictTransaction(payload) {
  const response = await client.post('/predict', payload);
  return response.data;
}

export default client;
