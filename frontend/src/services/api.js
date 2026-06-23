import axios from 'axios';

const client = axios.create({
  baseURL: 'https://fraud-detection-model-ay51.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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
